from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
import time

from .utils import threaded_search_all_files

class CustomPagination(PageNumberPagination):
    page_size = 20

    def get_paginated_response(self, data):
        return Response({
            'results': data,
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'search_time_seconds': self.request._search_time
        })

class EventSearchView(APIView):
    def get(self, request):
        search_string = request.GET.get('search_string')
        start_time = request.GET.get('start_time')
        end_time = request.GET.get('end_time')

        if not search_string:
            return Response({'error': 'Missing required parameter: search_string'}, status=status.HTTP_400_BAD_REQUEST)

        if not start_time or not end_time:
            return Response({'error': 'Missing required parameters: start_time and/or end_time'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            start_time = int(start_time)
            end_time = int(end_time)
        except ValueError:
            return Response({'error': 'start_time and end_time must be integers (epoch format)'}, status=status.HTTP_400_BAD_REQUEST)

        if start_time > end_time:
            return Response({'error': 'start_time cannot be greater than end_time'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            start_search = time.time()
            results = threaded_search_all_files(search_string, start_time, end_time)
            duration = round(time.time() - start_search, 4)
        except Exception as e:
            return Response({'error': 'Internal server error during search', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        paginator = CustomPagination()
        request._search_time = duration  # store search time on request to include in response
        paginated_results = paginator.paginate_queryset(results, request)

        return paginator.get_paginated_response(paginated_results)
