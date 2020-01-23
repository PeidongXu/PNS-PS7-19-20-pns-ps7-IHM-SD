## REQUIREMENTS

-installation de OpenCV:
$ pip install opencv-contrib-python
-former un fichier .weight : yolov3.weights
A base des 3 archives (.rar) de PNS-IHM-SD/Video Detection/yolo-object-detection/yolo-coco


## EXECUTION

-Se positionner dans repertoire : PNS-IHM-SD/Video Detection/yolo-object-detection
-Lancer la commande suivante pour traitement avec image :
$ python yolo.py --image images/baggage_claim.jpg --yolo yolo-coco

(apres --image il faut un chemin vers une image)

-Lancer la commande suivante pour traitement avec vidéo :
$ python yolo_video.py --input videos/vid.mp4 --output output/vid_output.avi --yolo yolo-coco

(apres --video il faut un chemin vers une video)

## OUTPUT

-format de output : "X,Y,Z"
x: Le nombre de personne sur l'image
y: Le nombre de groupe de personnes sur l'image
z: Le nombre de personnes dans le plus grand groupe

-fichier de sortie :
Une image est produite ou on met en evidence les personnes détectées


## TEST PEOPLE COUNT
Un test automatisé qui lance le script sur n images et retourne le pourcentage
de réussite de la détection des personnes

-Se positionner dans repertoire : PNS-IHM-SD/Video Detection/yolo-object-detection
-Lancer la commande suivante :
$ python test_people_count.py
