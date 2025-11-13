### 1. Suppose you roll a fair 6-sided die until you've seen all 6 faces. What is the probability you won't see an odd numbered face until you have seen all even numbered faces?

It's important to realize that you should not focus on the number of rolls in this question, but rather the ways to order when a face has been seen. ie) The sequence 2, 5, 3, 1, 4, 6 represents your first unique sighting being a 2, second being a 5, third being 3, and so on. In other words, we don't care about sth like 2, 2, 5, 2, 3... They are same as 2, 5, 3.
This would be an invalid sequence as we have seen an odd numbered face before seeing all the even numbered faces.

There are 6! total orderings. We can use this as our denominator. 

For our numerator, we want to group only even numbers for the first 3 sightings, and the remaining odd numbers for the last 3.

For first 3, there will be $^3C_3$ = 3! combination, so as well as last 3.

The result would be $\frac{3! \times 3!}{6!} = \frac{1}{20}$.

### 2. What is the expected number of cards you need to draw from a 52-card deck before you see the first ace?

Assume all 4 aces are identical, so do the rest cards.

There would be 4 ace in 52 cards, $A_1$, $A_2$, $A_3$, $A_4$. There would be

\__$A_1$\__$A_2$\__$A_3$\__$A_4$\__
5 gaps.

The rest 48 card will be placed in these 5 gaps, the expected value is equal to average value due to law of large number $48/5 = 9.6$ 
So the next would be the first ace 9.6+1 = **10.6** 

***It is important to know the first ace is included or not.***

### 3. Jim will roll a fair, six-sided dice until he gets a 4. What is the expected value of the highest number he rolls through this process?

Because we stop until 4, so the highest number is at least 4. There would be 3 situation, the highest is 4, 5 and 6.

If highest is 4, that means no 5 and 6, which would be $\frac{1}{3}$.

If highest is 6, that means we end with sth like {6, 4} with other number between them. For situation {4, 6} and {6, 4}, probability is $\frac{1}{2}$.

If highest is 5, that would be 
{4, 5, 6}
{4, 6, 5}
{5, 6, 4}
{5, 4, 6}
{6, 4, 5}
{6, 5, 4}
totally 3! = 6 situations, and only {5, 4, 6} works for highest is 5. Probability would be $\frac{1}{6}$

EV = $4 \times P(4) + 6 \times P(6) + 5 \times P(5) = 4 \times \frac{1}{3} + 6 \times \frac{1}{2} + 5 \times \frac{1}{6} = \frac{31}{6}$

### 4. You place three dots along the edges of an octagon at random. What is the probability that all three dots lie on distinct edges of the octagon?

$\frac{8}{8} \times \frac{7}{8} \times \frac{6}{8} = \frac{336}{512} = \frac{21}{32}$ 

### 5. Two gamblers are playing a coin toss game. Gambler A has (n+1) fair coins; B has n fair coins. What is the probability that A will have more heads than B if both flip all their coins?

There is only two situations, A has more head and A has more tail, therefore, by symmetry, probability is $\frac{1}{2}$. 

***The green book page 77 on pdf, 61 for the book itself for another method***

