# PNS-PS7-19-20-pns-ps7-19-20-ihm-sd
## Application Polympic
Polympic sera une application smartphone comportant une carte interactive avec des marqueurs
d’événement sportif en temps réel. Elle comportera un filtrage des événements en fonction de
différent critère temporel, sportif, lieux, … On pourra retrouver un espace pour les utilisateurs
lambda ainsi qu’une page d’administration regroupant toutes les informations sur les événements
sportifs ou humain. On pourra notamment y voir les caméras de surveillant (ou photo d’un moment
donné) avec une détection des personnes, de groupes (mouvement de foules), de problème (Par
exemple : colis abandonnés).

--------

## En Cours de développement
#### Axe IHM : Intéraction guidée
* Guidage temporel de l'utilisateur à travers des informations sur les évènements en cours, passé ou futur avec une granularité d'un jour.
* Compte à rebours avant évènement
* Distance entre l'utilisateur et l'évènement
#### Axe SD : Vidéo surveillance
* Détection de personnes sur une image ou une vidéo
* Comptage du nombre de personnes sur une image ou vidéo
* Calcul de distance en 2D sur une image (3D requière du matériel spécifique)
* Détection de groupe sur une image (en fonction de la distance entre les personnes)
--------
## REQUIREMENTS
- Expo : ```npm install -g expo-cli```
- Python : https://www.python.org/
- OpenCV : ```pip install opencv-contrib-python```
- modules : ```cd .\PNS-IHM-SD\front\ | npm install ``` et ```cd .\PNS-IHM-SD\back\ | npm install ```
- Fichier .weight : ```yolov3.weights``` décompresser les 3 archives dans `PNS-IHM-SD/Video Detection/yolo-object-detection/yolo-coco`

--------
## EXECUTION
#### Front: 
```bash
$ cd .\PNS-IHM-SD\front\
$ expo start
```

#### Back:
```bash
$ cd .\PNS-IHM-SD\back\
$ npm start
```
--------
## Python (SD)
### Exécution 
Pour exécuter le code python avec une image:

```bash
$ cd '.\PNS-IHM-SD\Video Detection\yolo-object-detection\
$ python yolo.py --image images/polytech.jpg --yolo yolo-coco
```
Pour exécuter le code python avec une vidéo:
```bash
$ cd '.\PNS-IHM-SD\Video Detection\yolo-object-detection\
$ python yolo_video.py --input videos/vid.mp4 --output output/vid_output.avi --yolo yolo-coco
```
### Output
Format de output : "X,Y,Z"
  * x: Le nombre de personne sur l'image
  * y: Le nombre de groupe de personnes sur l'image
  * z: Le nombre de personnes dans le plus grand groupe

Fichier de sortie :
Génération d'un image dans le répertoire courant avec la détection des personnes et groupes dessus

-----------------------------

## TEST 
### PEOPLE COUNT
Un test automatisé qui lance le script sur n images et retourne le pourcentage de réussite de la détection des personnes

```bash
$ cd '.\PNS-IHM-SD\Video Detection\yolo-object-detection\
$ python test_people_count.py
```

