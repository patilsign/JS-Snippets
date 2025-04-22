Let’s start with an example

function x(){
  var a = 10;
  function y(){
    console.log(a);
  }
  y();
}
x();
Because of JS lexical scope concept, so when y() function is invoked and executed, it ‘ll try to find a inside local memory scope. If not found there, then it goes to Lexical Parent and search there.

What should be the output?


Let’s put debugger and check what is happening in background:


Closure means that a function bind together with its lexical environment or you can say “function along with it’s lexical scope”

Why it says Closure (x) in above screenshot?
We hold program on to y() at line 4 so inside y() , it forms closure with the variable a which was part of function x() lexical scope.

Or you can say, function y() is bind to variable of function x() . So , it forms a closure and it has access to it’s parent lexical scope.

— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — -

Let’s take another example:

function x(){
  var a = 10;
  function y(){
    console.log(a);
  }
  return y;
}
var z = x();
console.log(z);
Closures come into picture when you try to return these functions outside.

Output:


So, as you can see function y()is returned in to variable z now.

At Line 8, function x()is gone from memory space, completely vanish and no longer in call stack.
So, now variable z contains function y().

Question: As function y( ) is returned and no longer reside inside function x( ). How will this behave in other lexical scope?
Let’s try calling function z(). See below:

function x(){
  var a = 10;
  function y(){
    console.log(a);
  }
  return y;
}
var z = x();
console.log(z);
z();  // call function here
As function y() is trying print variable a but variable a is not in global scope and function x()is not in call stack anymore. What will happen to variable a? What will invoking function z() will print now?

Output:


As you can see, it printed 10.

Here comes concept of closure, When a function is returned from another function, they still maintains their Lexical Scope. They remember where they were actually present.

We can say when function y() was returned, not only function code was returned but closure was returned.

That closure enclosed function along with Lexical scope is returned.

******************************
IDK Why but I like to compare Closures to daughters in Indian family’s. 🤷🏻‍♀️

Like when a daughter got married and went to in-laws house , she remembers from where she came , family member names and other family details and history.

In same way , when function is returned, it not only return code but returns lexical scope as well which is called Closures.

Physical body represents function body
Memory/details from her parents represents Lexical scope
Daughter represents Closures 🫣

*********************************

— — — — — — — — — — — — — — — — — — — — — — — — — — — — — -

Let’s take another example:
function x(){
  var a = 10;
  function y(){
    console.log(a);
  }
  a = 100;
  return y;
}
var z = x();
console.log(z);
z();
What should be output now?



Because console.log(a) doesn’t refers 10. It is reference to the variable not the value. So, reference to variable persist.

***********************************
Again let’s take daughter’s example🫣
She remember her brother so first brother was staying at place A but then moved to place B. So, reference is to the brother not to the address. Address can keep changing.
Reference to the variable persist not the value.

*************************************

So, now variable a’s reference points to 100 . That means 100 is still in memory preserved because of closure. When function x() was gone , it is not garbage collected, because it has to be used later. That’s why 100 printed not 10.

— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — -

Let’s take another example again :
function z(){
  var b = 20;
  function x(){
    var a = 10;
    function y(){
      console.log(a,b);
    }
    y(); // call function here
  }
  x(); // call function here
}

z(); // call outer function here
Run it and add debugger in browser:


As you can see in above, there are two closures : Closure (x) and Closure (z).

Closure (x) => for parent
Closure (z) => For parent’s parent

So, if y() is being returned anywhere then value of variable a and variable b are not garbage collected.

********************************************
If I may again take daughter’s example🫣
Daughter remembers her mother’s family as well i.e grand parents .
Her mother was also someone’s daughter so she can also be represented as Closure.

Mother = function x()=> knows variable bbecause it is it’s Lexical scope which is function z()
Daughter = function y()=> knows variable a because it is it’s Lexical scope which is function x(), then further function x() knows variable b in same way

********************************************

So, Because of Closures, as these functions remember things even when they are not in their lexical scope, this makes JS language very powerful.


Few Common usage of Closures are :
Module Design Patterns
Currying
Function Like once
memoize
maintaining state in async world
setTimeouts
Iterators
Data Hiding and Encapsulation

Disadvantages of Closures:
There could be over consumption of memory because every time a closure is formed, it consumes a lot of memory.
Those closed over variables are not Garbage Collected, so it means it is accumulating a lot of memory
If not handled properly, it can lead to memory leaks.