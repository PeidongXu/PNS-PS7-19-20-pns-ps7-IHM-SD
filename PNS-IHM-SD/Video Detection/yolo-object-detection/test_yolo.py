# -*- coding: utf-8 -*-

import unittest

# construct the argument parse and parse the arguments

class TestYoloFunc(unittest.TestCase):
    """Test yolo.py"""
    def setUp(self):
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
                        
            nb_group = l
            max = 0
            for i in range(l):
                
                if len(groups[i]) == 1:
                    nb_group= nb_group - 1
                if len(groups[i])>max:
                    max = len(groups[i])
            return max 
    
        boxes = [(50,50,15,30),(60,60,15,30),(70,70 ,15,30),(70, 90,15,30),(500,20,15,30)]
        confidences = []
        classIDs = []
        group_list = {}
        distance_list=[]
        group_set =  [ [1,2,3],[4,5,6],[3,4],[7,8],[8,9],[6,12,13] ]
        #def test_init:
        distance_list=[]
        self.max =sort_group(group_set)
    def calculate_distance(x1,y1,x2,y2):
        d_x = x2 - x1
        d_y = y2 - y1
        #calculata the distance between the two poin
        distance = math.sqrt(d_x**2 + d_y**2)
        return distance
    
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
                    
        nb_group = l
        max = 0
        for i in range(l):
            
            if len(groups[i]) == 1:
                nb_group= nb_group - 1
            if len(groups[i])>max:
                max = len(groups[i])
        return max 
    
    #max = sort_group(group_set)
    #print("the max is  " %max)
    def test_sort_group(self):
        """Test metho sort_group"""
        assert self.max == 8, "this is not true"
        self.assertEqual(1, 1)
        #assertEqual(8,max)
    
    

if __name__ == '__main__':
    unittest.main()