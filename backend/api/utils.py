import os
from concurrent.futures import ThreadPoolExecutor

EVENT_FIELDS = [
    "serialno", "version", "account_id", "instance_id", 
    "srcaddr", "dstaddr", "srcport", "dstport",
    "protocol", "packets", "bytes", "starttime",
    "endtime", "action", "log_status"
]

def search_in_file(file_path, search_string, start_time, end_time):
    matching = []
    filename = os.path.basename(file_path)

    try:
        with open(file_path, 'r') as f:
            for line_number, line in enumerate(f, 1):
                parts = line.strip().split()
                if len(parts) != len(EVENT_FIELDS):
                    continue

                try:
                    event = dict(zip(EVENT_FIELDS, parts))
                    event["source_file"] = filename
                    event_start = int(event["starttime"])

                    if not (start_time <= event_start <= end_time):
                        continue

                    if "=" in search_string:
                        if "=" not in search_string:
                            continue
                        key, val = search_string.split("=", 1)
                        if key not in event or event[key] != val:
                            continue
                    else:
                        if not any(search_string in str(v) for v in event.values()):
                            continue

                    matching.append({
                        "event": event,
                        "file": filename,
                        "timestamp": event_start
                    })
                except (ValueError, KeyError):
                    continue
    except (IOError, OSError):
        pass

    return matching

def threaded_search_all_files(search_string, start_time, end_time, data_directory='data'):
    results = []

    try:
        file_paths = [
            os.path.join(data_directory, filename)
            for filename in os.listdir(data_directory)
            if os.path.isfile(os.path.join(data_directory, filename))
        ]
    except (FileNotFoundError, PermissionError) as e:
        return []

    with ThreadPoolExecutor() as executor:
        futures = [
            executor.submit(search_in_file, path, search_string, start_time, end_time)
            for path in file_paths
        ]
        for future in futures:
            try:
                results.extend(future.result())
            except Exception:
                continue

    return results
