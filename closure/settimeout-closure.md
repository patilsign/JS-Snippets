Basic Definition : The setTimeout() function is commonly used if you wish to run your function a specified number of milliseconds from when the setTimeout() method was called. The general syntax of the method is:

setTimeout(expression, timeout);

where expression is the JavaScript code to run after timeout milliseconds have elapsed.


If we run this program, What do you expect to see in console?
Output:


It’ll print value of i i.e 1 after 1 sec.

Similarly if you try doing below, it’ll print after 3 sec.


You might be thinking that setTimeout() will wait for 3 sec first to print i and then print “Learn”. But NO, it will print “Learn” first then wait for 3 sec and print value of i .

What setTimeout() actually does?
At Line 3, function () forms a Closure. This function remember reference to i.
setTimeout() is taking that callback function and stores it into some place and attaches timer to it. And JS proceeds and goes to next line.
Once that timer expires, it takes that function, put it back in call stack and runs it.
Let’s take an example of complicated problem.

Print in console 1, 2, 3, 4, 5 … 10, after each and every second. Means 1 after 1 sec, 2 after 2 sec, 3 after 3 sec and so on. How would you do it?
First solution comes to mind is using for loop and move setTimeout() inside it. Like below, right ?


Let’s check output:


This is not what we expected. Why’s that? What happened?🧐

Two reasons:

1. We learn Closures how it is a function along with it’s lexical environment. So, even when function is taken out from it’s original scope, still it will remember it’s original scope. It’ll have access to those variables of it’s lexical scope.

Remember the example of Indian daughter’s that I give in last article to make it more relatable. If not, read here.

So, When setTimeout() takes this function and stores it somewhere and attaches a timeout, it remember the reference to i.

Remember, in last article, we understand how it remember reference to variable not value of it. In same way, a daughter remember her brother identity , not all the addresses he lived.

So, when loop runs the first time, it mix a copy of function, attaches timer and remember the reference of i .

Similarly, all 10 copies of functions, remember the reference of i , not the value. And all are pointing to same reference of i .

Why the hell they are pointing to same reference of i ? 😳
Because the environment for all these functions are same. All these copies of setTimeout()’s callback functions refers to i in same memory space. 🤷🏻‍♀️

2. JS doesn’t wait for anything. So, it will run the loop again and again 🔄.
So, setTimeout()will store all 10 functions and JS will move on. It won’t wait for timers to expire. It’ll print “Learn” and when the timer expires, it is too late.
Now, value of i changed because the loop was constantly running. when this callback function runs, by that time, the value of var i = 11 in memory location.

That’s why it prints 11 every time🤷🏻‍♀️. Because all of these copies of callback functions are referring to same spot in memory🤦🏻‍♀️. Which now have run 10 times and it’s value became 11 because of increment in for loop🙄.

Now, how we can fix this? 💡💡
use let instead of var because let has block scope. So for each and every loop iteration, i will be new variable every time. New copy of i will be in memory every time.
When setTimeout() runs , callback function will have new copy of i with it.


Let’s run and see output:


It worked 🎉🎉


Let’s just revise again, what actually happened because of let:
1. When loop started with i = 1 , function formed a closure with new variable itself.
2. After i++ , when function formed closure again, it does have new variable with value 2 and saves it.
3. And so on. This way it forms it makes 10 copies of variable i and forms closure with each and every function.


So, Next time someone asks you what will be the difference in output of below two cases and why? You know the answer 😎
Case 1:
function x(){
  for (var i = 1; i <= 10; i++){  // using var here 
    setTimeout(function (){
    console.log(i);
    }, i * 1000);
  }
  console.log("Learn")
}
x();
Case 2:
function x(){
  for (let i = 1; i <= 10; i++){  // using let here 
    setTimeout(function (){
    console.log(i);
    }, i * 1000);
  }
  console.log("Learn")
}
x();
Answer: let is Block Scoped and it’s creates a new copy every time until loop is executed.

And Twist again 🤭 : What If you have to only use var and prints 1,2,3,..10 every second? What to do?
Think a bit , what could be the solution?
Trick is , we have to make a new copy of variable i every time.


So, we will create a new function close() and wrap setTimeout() inside that. And pass i every time in calling.

Why it will work? 😬
Because every time you call close() function with i , it creates a new copy of i for setTimeout() 😎.

And that’s it. We covered how setTimeout() works and connected to closures.