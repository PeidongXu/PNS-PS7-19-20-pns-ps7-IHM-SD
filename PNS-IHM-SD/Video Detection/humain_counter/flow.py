import sys
"""
@version: 2.0
@author: xupeidong
@contact: xupeidong67@outlook.com
@file: people_flow.py
@updatetime: 2020/01/13 10:55
"""

if len(sys.argv) < 2:
    print("Usage: $ python {0} [video_path] [output_path(optional)]", sys.argv[0])
    exit()

from people_flow import YOLO
from people_flow import detect_video

if __name__ == '__main__':
    video_path = sys.argv[1]
    if len(sys.argv) > 2:
        output_path = sys.argv[2]
        detect_video(YOLO(), video_path, output_path)
    else:
        detect_video(YOLO(), video_path)
