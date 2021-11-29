import numpy as np
import matplotlib.pyplot as plt
import cv2

#new image of size 500 x 500
saliency = np.zeros([500,500,3],dtype=np.uint8)
saliency[:, :] = [255,255,255]

mouseArray = [[ 57.2, 21, 269 ],  [ 57.2, 56, 239 ],  [ 57.1, 59, 237 ],  [ 57.1, 74, 227 ],
  [ 57.1, 87, 218 ],  [ 57.1, 92, 212 ],  [ 57.1, 97, 205 ],  [ 57.1, 101, 199 ],
  [ 57, 106, 192 ],   [ 57, 112, 186 ],   [ 57, 122, 179 ],   [ 57, 134, 172 ],
  [ 57, 148, 164 ],   [ 57, 173, 155 ],   [ 56.9, 184, 152 ], [ 56.9, 201, 149 ],
  [ 56.9, 207, 147 ], [ 56.9, 227, 145 ], [ 56.9, 241, 142 ], [ 56.9, 255, 142 ],
  [ 56.8, 265, 142 ], [ 56.8, 274, 142 ], [ 56.8, 281, 143 ], [ 56.8, 287, 145 ],
  [ 56.8, 293, 148 ], [ 56.8, 298, 154 ], [ 56.7, 302, 160 ], [ 56.7, 307, 165 ],
  [ 56.7, 309, 170 ], [ 56.7, 311, 172 ], [ 56.7, 312, 173 ], [ 56.7, 312, 174 ],
  [ 56.6, 311, 174 ], [ 56.6, 309, 173 ], [ 56.1, 310, 173 ], [ 56.1, 312, 173 ],
  [ 56.1, 318, 171 ], [ 56.1, 323, 168 ], [ 56.1, 329, 165 ], [ 56.1, 334, 162 ],
  [ 56, 339, 160 ],   [ 56, 344, 158 ],   [ 56, 350, 156 ],   [ 56, 356, 154 ],
  [ 56, 360, 152 ],   [ 56, 363, 150 ],   [ 55.9, 364, 150 ], [ 55.9, 365, 150 ],
  [ 55.9, 365, 149 ], [ 55.4, 365, 149 ], [ 55.4, 366, 149 ], [ 55.4, 366, 148 ],
  [ 55.3, 367, 148 ], [ 55.3, 367, 148 ], [ 52.6, 367, 149 ], [ 52.6, 367, 150 ],
  [ 52.6, 367, 155 ], [ 52.6, 365, 160 ], [ 52.6, 363, 166 ], [ 52.5, 361, 172 ],
  [ 52.5, 360, 179 ], [ 52.5, 358, 185 ], [ 52.5, 357, 190 ], [ 52.5, 356, 196 ],
  [ 52.5, 356, 198 ], [ 52.4, 355, 206 ], [ 52.4, 355, 209 ], [ 52.4, 355, 218 ],
  [ 52.4, 355, 223 ], [ 52.4, 355, 228 ], [ 52.4, 355, 231 ], [ 52.3, 355, 233 ],
  [ 52.3, 355, 235 ], [ 52.3, 355, 237 ], [ 52.3, 355, 238 ], [ 52.3, 355, 240 ],
  [ 52.3, 355, 242 ], [ 52.2, 355, 246 ], [ 52.2, 354, 251 ], [ 52.2, 351, 259 ],
  [ 52.2, 350, 266 ], [ 52.2, 348, 273 ], [ 52.2, 346, 278 ], [ 52.1, 345, 281 ],
  [ 52.1, 344, 284 ], [ 52.1, 343, 286 ], [ 52.1, 343, 288 ], [ 52.1, 343, 290 ],
  [ 52.1, 343, 292 ], [ 52, 343, 296 ],   [ 52, 344, 301 ],   [ 52, 346, 307 ],
  [ 52, 348, 314 ],   [ 52, 350, 319 ],   [ 52, 351, 326 ],   [ 51.9, 352, 336 ],
  [ 51.9, 352, 344 ], [ 51.9, 352, 352 ], [ 51.9, 352, 360 ], [ 51.9, 352, 366 ]]

def points_in_circle_np(radius, i, j):
    a = np.arange(radius + 1)
    for x, y in zip(*np.where(a[:,np.newaxis]**2 + a**2 <= radius**2)):
        yield from set(((x, y), (x, -y), (-x, y), (-x, -y),))

for x in range(len(mouseArray)-1):
    mousex = mouseArray[x][1]
    mousey = mouseArray[x][2]
    difference = mouseArray[x][0] - mouseArray[x+1][0]
    [a,b,c] = saliency[mousex,mousex]

    saliency[mousex,mousey] = [a, b-255, c]

    for y in range(51):
        points = points_in_circle_np(y)
        saliency[mousex-y,mousey-y] = [a, b-(5*(255-y)), c]
        saliency[mousex-y,mousey+y] = [a, b-(5*(255-y)), c]
        saliency[mousex+y,mousey+y] = [a, b-(5*(255-y)), c]
        saliency[mousex+y,mousey-y] = [a, b-(5*(255-y)), c]

cv2.imshow("Saliency", saliency)
cv2.waitKey()

#im = plt.imread('D:\\Projects\\xray\\images\\zview\\000000.png')
#if len(im.shape) == 4: # Remove transparency channel
#    im = im[:,:,:-1]
