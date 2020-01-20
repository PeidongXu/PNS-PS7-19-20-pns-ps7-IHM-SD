# USAGE
# python yolo.py --image images/baggage_claim.jpg --yolo yolo-coco

# import the necessary packages
import sys
import numpy as np
import argparse
import time
import cv2
import os

# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True,
	help="path to input image")
ap.add_argument("-y", "--yolo", required=True,
	help="base path to YOLO directory")
ap.add_argument("-c", "--confidence", type=float, default=0.5,
	help="minimum probability to filter weak detections")
ap.add_argument("-t", "--threshold", type=float, default=0.3,
	help="threshold when applyong non-maxima suppression")
args = vars(ap.parse_args())

# load the COCO class labels our YOLO model was trained on
labelsPath = os.path.sep.join([args["yolo"], "coco.names"])
LABELS = open(labelsPath).read().strip().split("\n")

# initialize a list of colors to represent each possible class label
np.random.seed(42)
COLORS = np.random.randint(0, 255, size=(len(LABELS), 3),
	dtype="uint8")

# derive the paths to the YOLO weights and model configuration
weightsPath = os.path.sep.join([args["yolo"], "yolov3.weights"])
configPath = os.path.sep.join([args["yolo"], "yolov3.cfg"])

# load our YOLO object detector trained on COCO dataset (80 classes)
net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)

# load our input image and grab its spatial dimensions
image = cv2.imread(args["image"])
(H, W) = image.shape[:2]

# determine only the *output* layer names that we need from YOLO
ln = net.getLayerNames()
ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]

# construct a blob from the input image and then perform a forward
# pass of the YOLO object detector, giving us our bounding boxes and
# associated probabilities
blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416),
	swapRB=True, crop=False)
net.setInput(blob)
start = time.time()
layerOutputs = net.forward(ln)
end = time.time()

# show timing information on YOLO

# print("[INFO] YOLO took {:.6f} seconds".format(end - start))


# initialize our lists of detected bounding boxes, confidences, and
# class IDs, respectively
boxes = []
confidences = []
classIDs = []
group_list = {}
# loop over each of the layer outputs
for output in layerOutputs:
	# loop over each of the detections
	for detection in output:
		# extract the class ID and confidence (i.e., probability) of
		# the current object detection
		scores = detection[5:]
		classID = np.argmax(scores)
		confidence = scores[classID]

		# filter out weak predictions by ensuring the detected
		# probability is greater than the minimum probability
		if confidence > args["confidence"]:
			# scale the bounding box coordinates back relative to the
			# size of the image, keeping in mind that YOLO actually
			# returns the center (x, y)-coordinates of the bounding
			# box followed by the boxes' width and height
			box = detection[0:4] * np.array([W, H, W, H])
			(centerX, centerY, width, height) = box.astype("int")

			# use the center (x, y)-coordinates to derive the top and
			# and left corner of the bounding box
			x = int(centerX - (width / 2))
			y = int(centerY - (height / 2))

			# update our list of bounding box coordinates, confidences,
			# and class IDs
			boxes.append([x, y, int(width), int(height)])

			confidences.append(float(confidence))
			classIDs.append(classID)

# apply non-maxima suppression to suppress weak, overlapping bounding
# boxes
idxs = cv2.dnn.NMSBoxes(boxes, confidences, args["confidence"],
	args["threshold"])
import math
distance_list=[]
def calculate_distance(x1,y1,x2,y2):
	d_x = x2 - x1
	d_y = y2 - y1
	#calculata the distance between the two point
	distance = math.sqrt(d_x**2 + d_y**2)
	return distance
#find group member

group_set=[]

#find the group 
for i in idxs.flatten():
	if LABELS[classIDs[i]]=="person":
		group_list.setdefault(i,[]).append(i)
		for j in range(i+1,len(boxes)):
			if LABELS[classIDs[j]]=="person":
				dis = calculate_distance(boxes[i][0], boxes[i][1],boxes[j][0], boxes[j][1])
				if dis <= boxes[i][2]+20 or dis <=boxes[j][2]+20 :
					group_list[i].append(j)
					distance_list.append(dis)


# draw a bounding box rectangle on all of the groups 
#print(group_list)
for i in group_list:
	if len(group_list[i])>1 and  LABELS[classIDs[i]]=="person" :

		#print(group_list[i])
		(x,y) = (boxes[i][0], boxes[i][1])
		w=0
		h = 0
		group_set.append(group_list[i])
		#group_set.setdefault(i,[]).append(i)
		group_color=(0,100,200)
		cv2.circle(image, (x, y), 10, group_color, 0)
		cv2.circle(image, (x, y), 30, (0,0,255), 0)
		#(w,h) = (boxes[i][2], boxes[i][3])
		for j in group_list[i]:
			(x,y) = (boxes[j][0], boxes[j][1])
			cv2.circle(image, (x, y), 10, group_color, 0)
		cv2.circle(image, (x, y), 30, (0,0,255), 0)
		#print (x,y,w,h)
		group_color=(0,0,255)
		#cv2.rectangle(image, (x, y), (x + w, y + h), group_color, 2)
#print(group_set)

#split the group  modify by peidong 17/01/2020 17:13
def sort_group(groups):
	#group_set =  [ [1,2,3],[4,5,6],[3,4],[7,8],[8,9],[6,12,13] ]
	l = len(groups)
	for i in range(l):
		for j in range(l):
			x = list(set(groups[i]+groups[j]))
			y = len(groups[j])+len(groups[i])
			if i == j or groups[i] == 0 or groups[j] == 0:
				break
			elif len(x) < y:
				groups[i] = x
				groups[j] = [0]
				#print group_set
	#print ([i for i in groups if i is not [0]])

	nb_group = l
	for i in range(l):
		max = 0
		if len(groups[i]) == 1:
			nb_group= nb_group - 1
		if len(groups[i])>max:
			max = len(groups[i])

	#print(nb_group)
	#print("the number of group is (%d)" %(nb_group))
	#print("the largest number of people is (%d)" %max)# the largest number of people in one group



groups = sort_group(group_set)

#print (groups)

# ensure at least one detection exists
if len(idxs) > 0:
	# loop over the indexes we are keeping
	for i in idxs.flatten():
		if LABELS[classIDs[j]]=="person":
			# extract the bounding box coordinates
			(x, y) = (boxes[i][0], boxes[i][1])
			(w, h) = (boxes[i][2], boxes[i][3])
			point_color=(0,0,255)


			# draw a bounding box rectangle and label on the image
			color = [int(c) for c in COLORS[classIDs[i]]]
			cv2.rectangle(image, (x, y), (x + w, y + h), color, 2)
			text = "{}: {:.4f}".format(LABELS[classIDs[i]], confidences[i])
			cv2.putText(image, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX,
				0.5, color, 2)





#Give Number of persons
smith_a=0
if len(idxs) > 0:
	# loop over the indexes we are keeping
	for i in idxs.flatten():

		if LABELS[classIDs[i]]=="person":
			smith_a=smith_a+1



#save image --- Path from server not from .py program
#here is path from py.file : ../../front/assets/imagesScript/output_"+args["image"].split('/')[-1]
#cv2.imwrite("../front/assets/imagesScript/output_"+args["image"].split('/')[-1], image)

# show the output image
#cv2.imwrite("../front/assets/imagesScript/output.jpg", image)

# show the output image

#print("the number of people is %d" %smith_a)
sys.stdout.write(str(smith_a))
sys.stdout.flush()
#cv2.imshow("Image", image)
cv2.imwrite("testyolo.jpg",image)
cv2.imwrite("../front/assets/imagesScript/output.jpg", image)
cv2.waitKey(0)
