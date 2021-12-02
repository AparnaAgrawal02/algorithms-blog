---
layout: post
title:  "Tower of Hanoi!!"
date:   2021-11-26 14:24:45 +0530
categories: jekyll update
---
Tower of hanoi is very famous and interesting game!
There is a story about an ancient temple in India, it has a large room with three towers surrounded by 64 golden disks.
These disks are continuously moved by priests in the temple one at a time. According to a prophecy, when the last move of the puzzle is completed the world will end!!


#### Game Rules:
    1)Only the topmost disk can move
    2)Only one disk can move at a time
    3)The disk can be placed on another disk only if the other disk is larger 
    Your goal is to shift the stack of disk in the same order to another tower 
    challenge:Do it in minimum possible moves  
    Tower of Hanoi puzzle with n disks can be solved in minimum 2n−1 steps


<iframe width="700" height="500" frameborder="0" scrolling="no" src="../../../../../towerofhanoi/towerofhanoi.html"></iframe>

while playing the game you must have noticed that you have to reconstruct the disk tower repeated that is you have to repeat similar process again and again to sovle the problem.
Algorithmicly you can do this by recursion
### Recursion
Recursion refers to a function calling itself.(Inception)
Recursion solves such types of problems that require repetition in the process

### Divide and conqure algorithm
A divide-and-conquer algorithm recursively breaks down a problem into two or more sub-problems of the same or related type, until these become simple enough to be solved directly.  
For instance, Imagine you have eighty coins and a set of balance scales. All the coins weigh the same, apart from one that weighs slightly less. To find this lighter coin, one solution would be to weigh and compare two coins at a time to see if there is any difference in weight – but this method would take ages. A faster way would be to divide the pile into two piles of forty and weigh these two piles against one another. You can select the lighter pile and discard the other forty coins all at once. You then repeat this process, dividing the pile into two twenties, two tens, and so on, until you narrow it down to the one coin.  

one can solve the game by dividing the problem in subproblems.you can think of   
  first shifting n-1 disks to helper tower  
  then moving nth disk to destination tower and  
  then shifting n-1 disk to destination tower and repeating the same process.  

### Recursive Divide and conqure Algorithm
    def towerOfHanoi(N , source, destination, auxiliary):
      if N==1:
        print("Move disk 1 from ",source,"to ",destination)
        return
      towerOfHanoi(N-1, source, auxiliary, destination)
      print("Move disk",N,"from ",source,"to ",destination)
      towerOfHanoi(N-1, auxiliary, destination, source)
    
    N = 3
    towerOfHanoi(N,'A','B','C')
    A, C, B are the name of rods

### Output
<img src="../../../../../towerofhanoi/images/1.png" alt="Example image1" width="300"/> &nbsp;
<img src="../../../../../towerofhanoi/images/2.png" alt="Example image2" width="300"/>  
Move disk 1 from  A to  B &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Move disk 2 from  A to  C  

<img src="../../../../../towerofhanoi/images/3.png" alt="Example image3" width="300"/> &nbsp;
<img src="../../../../../towerofhanoi/images/4.png" alt="Example image4" width="300"/>  
Move disk 1 from B to C &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Move disk 3 from  A to B  
 
<img src="../../../../../towerofhanoi/images/5.png" alt="Example image5" width="300"/>  &nbsp;
<img src="../../../../../towerofhanoi/images/6.png" alt="Example image6" width="300"/>   
Move disk 1 from  C to  A &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Move disk 2 from  C to B   
<img src="../../../../../towerofhanoi/images/7.png" alt="Example image7" width="300"/>  
Move disk 1 from  A to  B 

since we have developed an divide and conqure recursive algorithm we can find the minimum number of steps required to develop the solution.  
As a result of the above procedure, the minimum number of moves h<sub>n</sub>  required to solve the puzzle of n disks on three rods is given by the recurrence relation
##   
    h<sub>n</sub>=2h<sub>n-1</sub>+1 	  
    with h<sub>1</sub>=1.  
    h<sub>n</sub> =(2*(2*h<sub>n-2</sub> + 1) ) + 1  
                  = 2<sup>2</sup>*h<sub>n-2</sub> + 2 + 1  
                  =  2<sup>3</sup>*h<sub>n-3</sub> + 2<sup>2</sup> + 2 + 1  
                  =2<sup>n-1</sup>*h<sub>n-(n-1)</sub> +2<sup>n</sup>+ …… + 2<sup>2</sup> + 2 + 1  
    h<sub>n</sub>=2<sup>n</sup>-1, 
Thus time complexity of abov Algorithm is O(2^n)   
we should look for another way to count the number of moves, such as how many times each of the individual discs is moved to complete the task.The largest disc moves once, or 1 (base 2) move;
the second largest disc moves twice, or 10 (base 2) times ; the next largest disc moves four times, or 100 (base 2) times; and so on. That is, each of the terms in the sum, in the string of ones (base 2), corresponds to the number of moves made by a particular disc
  
To always solve the puzzle in minimum moves do this:
move the smallest disk in clockwise(anticlockwise) direction.
make the only possible movement.
repeat.

### wondering what is maximum moves to solve the puzzle?  
In this case,the largest disc is moved from A to B in two (maximum) steps (A → C, C → B).  
To achive above,the other (n−1) discs are shifted from A to B, then nth disc is moved A to C,
other (n−1) discs are shifted from B to A,then nth disc is moved C to B, and again, other (n−1) discs are shifted from A to B. 

As a result of the above procedure, the maximum number of moves h<sub>n</sub>  required to solve the puzzle of n disks on three rods is given by the recurrence relation
##  
    h<sub>n</sub>=3h<sub>n-1</sub>+2 	  
    with h<sub>1</sub>=2.  
    h<sub>n</sub> =(3*(3*h<sub>n-2</sub> + 2) ) + 2  
                  = 3<sup>2</sup>*h<sub>n-2</sub> + 2*3 + 2  
                  =  3<sup>3</sup>*h<sub>n-3</sub> + 2*3<sup>2</sup> + 2*3 + 2  
                  =3<sup>n-1</sup>*h<sub>n-(n-1)</sub> +3<sup>n</sup>+ …… + 2*3<sup>2</sup> + 2*3 + 2  
    h<sub>n</sub>=3<sup>n</sup>-1,

The tower will reach all possible states  
if you want to try yourself to get maximum number  
1)move the smallest disk to the right,repeat this again  
2)move other possible disk  
3)move the smallest disk to left,repeat this again  
Repeat 1,2,3  
The number of possible states for a given puzzle with n disks is 3<sup>n</sup>
since each disk can be on one of the three pegs  

  
<img src="../../../../../towerofhanoi/images/State-Space-for-the-Three-Disk-Tower-of-Hanoi-Puzzle.png" alt="Example image7" width="400"/> 

 **State Graph of the Three-Disk Tower of Hanoi Puzzle**

 The graph representing the states of momement as nodes and edges as valid move from one node to other.
In the limit as n goes to infinity, this sequence of graphs can be interpreted as a discrete analogue of fractal figure the **Sierpinski triangle**.

#### Fractals

A fractal is a geometric shape that, loosely speaking, contains patterns that repeat themselves at many different scales. Fractals are often very appealing to the human eye and can be frequently found in nature – think about the branches of a tree, and how each is like a miniature tree with sub-branches of its own. Fractals are also a useful concept for solving mathematical problems  

<br/><br/>
<img src="../../../../../towerofhanoi/images/minimum.png" alt="Example image7" width="350"/> <img src="../../../../../towerofhanoi/images/maximum.png" alt="Example image7" width="350"/> 
 
The sides of the outermost triangle represent the shortest ways of moving a tower from one peg to another one.
The other diagram shows maximum moves to solve the puzzle

<br/><br/>


1) From every arbitrary distribution of disks, there is exactly one shortest way to move all disks onto one of the three pegs.  
2) Between every pair of arbitrary distributions of disks there are one or two different shortest paths.  
3) From every arbitrary distribution of disks, there are one or two different longest non selfcrossing paths to move all disks to one of the three pegs.    
4) Between every pair of arbitrary distributions of disks there are one or two different longest non self-crossing paths.  

The average length of a shortest path connecting two random states of the puzzle. While in the worst possible case the number of steps would be 2N-1 (which happens when both the initial and final states happens when both the initial and final states have all the discs concentrated on one pole, as in the original problem), Hinz’s formula says that for general initial and final states, the number of steps required would be, on average, only 466/885 times 2N, or approximately 52.6% the number of steps of the worst case. (N is the number of discs).

### Connection with Binary Digits!
Disk positions can be determined from the binary representation of the move number.  
The initial state being move 0, with all digits 0, and the final state being with all digits 1  
The most significant bit represents the largest disk.   
A value of 0 indicates that the largest disk is on the initial peg, while a 1 indicates that it's on the final peg (right peg if number of disks is odd and middle peg otherwise).    
The disk you move in step k of the solution is the disk that corresponds to the least significant 1 bit in the binary representation of k.  
Example for n = 3:  
  step | bits | disk  
    1 &nbsp; &nbsp; &nbsp;| &nbsp;001 | &nbsp;1  
    2 &nbsp; &nbsp; &nbsp;| &nbsp;010 | &nbsp;2  
    3 &nbsp; &nbsp; &nbsp;| &nbsp;011 |&nbsp; 1  
    4 &nbsp; &nbsp; &nbsp;| &nbsp;100 | &nbsp;3  
    5 &nbsp; &nbsp; &nbsp;| &nbsp;101 | &nbsp;1  
    6 &nbsp; &nbsp; &nbsp;| &nbsp;110 | &nbsp;2  
    7 &nbsp; &nbsp; &nbsp;| &nbsp;111 | &nbsp;1   
    The source and destination pegs for the mth move can also be found elegantly from the binary representation of m using bitwise operations.   
    Move m is from peg (m & m - 1) % 3 to peg ((m | m - 1) + 1) % 3, where the disks begin on peg 0 and finish on peg 1 or 2 according as whether the number of disks is even or odd.   

### Iterative Solution
    import math
    def towerOfHanoi(N , source, destination, auxiliary):
        pegs =[ source,auxiliary, destination]
        totalMoves = pow(2,N)-1
        for m in range(1,totalMoves+1):
                
            LeastSignificantSetBit =math.log2((m &-m))+1
            source = pegs[(m & m - 1) % 3]
            destination =  pegs[((m | m - 1) + 1) % 3]
            print("Move disk ",LeastSignificantSetBit," from ", source ," to ", destination)
            
    N = 3
    towerOfHanoi(N,'A','B','C')

### The end of the world 
when will the temple priests complete their task of moving all of the 64 disks?. The number of years to complete the task is at least: 2<sup>64</sup>-1 moves ie let us suppose that priests require 1 second to perform one move. At this speed, they would require 2<sup>64</sup>-1seconds to shift all discs from source tower to destination tower, which would be around 18,446,744,073,709,551,615 seconds, which would be approximately 580 billion years.(The earth is approximately 4.5 billion years old :))


### Reve's puzzle(Tower of Hanoi problem with four pegs!)
To find an optimal solution to find minimum steps to solve with  n>3 pegs is not as simple as it sounds.its been 
Frame–Stewart algorithm
The Frame–Stewart algorithm is described below:
n = disks.
k = pegs.
T(n,k)  is minimum number of moves required to transfer n disks using k pegs.
The algorithm can be described recursively:

- For some l,0<=l< n, transfer the top l disks to a single peg other than the start or destination pegs, taking T(l,k) moves.  
- Without disturbing the peg that now contains the top l disks, transfer the remaining n-l disks to the destination peg, using the remaining k-1 pegs, taking T(n-l,k-1) moves.  
- Transfer the top l disks to the destination peg, taking T(l,k) moves. 

- The entire process takes 2T(l,k)+T(n-l,k-1) moves. Therefore, the count l should be picked for which this quantity is minimum.   
for 4-pegs, T(n,4) = 2T(l,4) +T(n-l,3) = 2T(l,4)+2<sup>n-l</sup>   
the optimal l equals  the nearest integer to sqrt(2n).  

<br/><br/>


[Amazing youtube video by 3Blue1Brown](https://www.youtube.com/watch?v=2SUvWfNJSsM&t=753s)  
[Amazing youtube video by mathologer](https://www.youtube.com/watch?v=MbonokcLbNo)  
[Towers of Hanoi – where programming techniques blend](http://www.acta.sapientia.ro/acta-info/C1-1/info1-8.pdf)  
https://en.wikipedia.org/wiki/Tower_of_Hanoi

<!-- 
### Algorithm
      def towerOfHanoi(N , source,aux1,aux2, destination):
        if (n == 1):
          print("Move disk 1 from ",source,"to ",destination)
          return
        towerOfHanoi(n – 2,source, aux1,aux2, destination)
        print("Move disk", n-1, "from", source ," to ", aux2)
        print("Move disk", n, "from",source,“to ”, destination)
        print("Move disk", n-1, "from", aux2,“to ”, destination)
        towerOfHanoi(n – 2, aux1,destinaion,source, aux2)
 -->
<!-- hello
You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

Jekyll requires blog post files to be named according to the following format:

`YEAR-MONTH-DAY-title.MARKUP`

Where `YEAR` is a four-digit number, `MONTH` and `DAY` are both two-digit numbers, and `MARKUP` is the file extension representing the format used in the file. After that, include the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:


{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}
 -->
<!-- Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
 -->