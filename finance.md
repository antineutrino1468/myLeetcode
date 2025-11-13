# Option


$S_T$,Spot price at expiration
$K$,Strike price
$C$,Call premium
$P$,Put premium


| **Strategy**   | **Action**    | **Market Outlook** | **Profit & Loss** | **Payoff Formula** | **Risk Level** |
|----------------|---------------|--------------------|-------------------|--------------------|--------------------|
| **Long Call**  | Buy Call      | Bullish            | Unlimited ↑, Limited ↓ | $\max(0, S_T - K) - C$ |Low |
| **Short Call** | Sell Call     | Bearish/Neutral    | Limited ↑, Unlimited ↓ | $C - \max(0, S_T - K)$ |High |
| **Long Put**   | Buy Put       | Bearish            | Unlimited ↑ (max: K- P), Limited ↓     | $\max(0, K - S_T) - P$ |Low |
| **Short Put**  | Sell Put      | Bullish/Neutral    | Limited ↑, Unlimited ↓ (max: K- P)    | $P - \max(0, K - S_T)$ |High |

**Long calls** and **long puts** offer **limited risk** and **potentially unlimited profit**, but they have a **lower probability of profit** because you must overcome both **time decay (θ)** and often **high implied volatility**.  
In contrast, **short options** have **limited profit** (the **premium**) and **large potential losses**, but they have a **higher probability of profit** because **time decay works in their favor**.

---

### **Theta (θ)**
The **change in value of an option with the passing of time**.

\[
\Theta = \frac{\partial V}{\partial t}
\]

- When you **buy an option**, you will **pay theta** (**negative θ**).  
- When you **sell an option**, you will **collect theta** (**positive θ**).

The **short side** earns **positive theta** each day — this represents the **daily realization of the option’s time value**.  
Over time, the **total theta collected cannot exceed the initial premium**, which is the **seller’s maximum profit**.

**Theta changes over time** and becomes **larger (in absolute value)** as the option approaches **expiration**, especially for **at-the-money options**.

In practice, **long options** only win when the **market moves far enough** or **volatility increases sharply**.  
Otherwise, **short options** tend to win more often because **most of the time the market remains stable**.  
That’s why **short positions** have **higher win probabilities but larger risks**, while **long positions** have **smaller win probabilities but much larger payoff potential**.

So as the short side, you don't predict the market but collect rent from people who do, and theta is the only greek pays you while sleep. 80 % win-rate beats 800 % payoff 9 times out of 10.

# Covered Call and Protective Put

| **Strategy Name**                    | **Construction Method**                                       | **Market Outlook**           | **Characteristics**                                                 | **Profit Potential**                                        | **Maximum Loss**                               | **Risk Level** |
| ------------------------------------ | ------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------- | -------------- |
| **Covered Call** (**Buy-write**)     | Long stock + Short call                                       | Neutral to slightly bullish  | Lowers cost, but caps potential upside                              | **Limited** (up to strike + premium)                        | **Large** (if stock falls to 0, minus premium) | 🟠 Medium      |
| **Protective Put** (**Married Put**) | Long stock + Long put                                         | Bullish with bearish concern | Like insurance; protects existing holdings                          | **Unlimited** (stock upside)                                | **Limited** (premium of put)                   | 🟢 Low         |
| **Protective Collar** | Protective Put + Covered Call (Long Stock + Long Put + Short Call)                                       | Neutral to moderately bullish | Balanced protection: limits both downside and upside; low-cost hedge | **Limited** (strike difference − net cost)                  | **Limited** (strike difference or net debit)   | 🟢 Low         |



## Covered Call (Buy-Write)
**Naked Call** means you short a call without underlying asset, which is highly risky while profit is higher as well. But if you are not so sure about this bearish, you can use **Covered Call** to lower risk with more stable profit.

Covered Call and Buy-Write are same strategy but different timing. They both involving owning certain underlying asset, and you sell a call option on it (*This originally means bearish, but once you own the underlying asset instead of sell it naked, that means neutral or slightly bullish*)

If you already hold the underlying stock, and then you sell a call option, which is **Covered Call**. 
If you buy the stock and sell the call option simultaneously, which is **Buy-Write**.

***They are exactly the same strategy.***

The biggest loss of CC is not Forced liquidation, but your opportunity cost (you miss an opportunity of big increase)
### *Example*
You own one underlying stock: $100

Strike price of the call: $110

Premium: \$10

**Short Call Payoff = $C - \max(0, S_T - K)$**

If the stock price drop to \$0 ($S_T = 0$), 
the buyer will not exercise,  
you gain \$10 ($C$) premium and \$100 loss in stock,  
option payoff is $C - \max(0, 0 - 110) = 10 - 0 = +\$10$,  
so your total loss is \$100 - \$10 = \$90.

If the stock price rise to \$200 ($S_T = 200$),  
the buyer will exercise,  
as the seller it is your obligation to sell it at K = \$110, your option payoff is $10 - \max(0, 200 - 110) = 10 - 90 = +-\$80$, 
so your total profit = \$100 + (-\$80) = \$20

| Stock Price | Option Payoff | Stock Payoff | Total P&L |
|-------------|---------------|--------------|-----------|
| $0         | +$10          | –$100         | **–$90**  |
| $80         | +$10          | –$20         | **–$10**  |
| $100        | +$10          | $0           | **+$10**  |
| $110        | +$10          | +$10         | **+$20**  |
| $120        | +$10          | +$10 there is more profit for buyer but not for you        | **+$20**  |
| $150        | +$10          | +$10         | **+$20**  |
| $200        | +$10          | +$10         | **+$20**  |
```plaintext
Profit ($)                     
      ^                            
  +20 |          ————→ profit capped at +$20
      |         /                 
      |        /                  
      |       /                   
   0  |——————/————————————————→ Stock Price ($)
      |      90  100  110  150  200
      |    /                             
  -90 |———/                       
      ↓       

```                     

## Protected Put (Married Put)
You own stock (or just bought it) at $S_0$.
You buy a put option (strike $K$, premium $P$).
The put gives you the right to sell the stock at $K$.
So if the stock falls, the put’s value rises → your loss is limited.
If the stock rises, you keep the upside minus the cost of the put premium.

Protected Put means you already own asset, Married Put means you will need to buy it, but they are same strategy.

### *Example*
You own one underlying stock: **\$100**

Strike price of the put: **\$95**  
Premium: **\$5**

**Long Put Payoff =  max(0, $K − S_T$) − $P$**

If the stock price rises to **\$150 ($S_T = 150$)**,  
the buyer (you) will not exercise the put,  
so the option payoff is ` max(0, 95 − 150) − 5 = 0 − 5 = –$5 `. 

Your stock gains `150 − 100 = +$50`.  
→ **Total profit = +\$50 − \$5 = +\$45.**

If the stock price drops to **\$50 ($S_T = 50$)**,  
you will exercise the put and sell the stock at \$95,  
so the option payoff is `$max(0, 95 − 50) − 5 = 45 − 5 = +$40`.  
Your stock loss is `50 − 100 = –$50`.  
→ **Total = –\$50 + \$40 = –\$10 (max loss).**

| **Stock Price** | **Option Payoff (Put)** | **Stock Payoff** | **Total P&L** |
|-----------------|-------------------------|------------------|---------------|
| \$0   | +\$90 – \$5 = +\$85 | –\$100 | **–$15** |
| \$50  | +\$45 – \$5 = +\$40 | –\$50  | **–\$10** |
| \$80  | +\$15 – \$5 = +\$10 | –\$20  | **–\$10** |
| \$95  | +\$0 – \$5 = –\$5  | –\$5   | **–\$10** |
| \$100 | –\$5 | \$0 | **–\$5** |
| \$120 | –\$5 | +\$20 | **+\$15** |
| \$150 | –\$5 | +\$50 | **+\$45** |

**Maximum loss = –\$10 (≈ put premium + price gap if K < S₀)**  
**Unlimited profit potential = as stock rises**

```plaintext
Profit ($)
     ^
 +45 |                       /
     |                      /
     |                     /
     |                    /
   0 |___________________/
     |                   \
     |                    \
 -10 |--------------------→  Stock Price ($)
      50   80   95  100  120  150
```

If I want to hold a stock but I’m afraid it might drop, I can buy a **protective put** to hedge my downside risk.
If I expect a calm market with little volatility, I can sell a **covered call** to earn extra income (collect Theta) while holding the stock.


# Bull Call Spread and Bear Put Sprewad
| **Strategy Name**                    | **Construction Method**                                       | **Market Outlook**           | **Characteristics**                                                 | **Profit Potential**                                        | **Maximum Loss**                               | **Risk Level** |
| ------------------------------------ | ------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------- | -------------- |
| **Bull Spread**                      | Buy a Call with lower strike + Sell a Call with higher strike | Bullish                      | Limited profit and loss; lower cost                                 | **Limited** (difference between strikes − net premium)      | **Limited** (net premium paid)                 | 🟢 Low         |
| **Bear Spread**                      | Buy a Put with higher strike + Sell a Put with lower strike   | Bearish                      | Limited profit and loss                                             | **Limited** (difference between strikes − net premium)      | **Limited** (net premium paid)                 | 🟢 Low         |
| **Straddle**                         | Buy both a Call and a Put at the same strike price            | Expect high volatility       | Profits from large moves in either direction; loss = double premium | **Unlimited** (large up move) or **large** (down move to 0) | **Limited** (total premium paid)               | 🟠 Medium–High |
| **Strangle**                         | Buy a Call and a Put with different strike prices             | Expect high volatility       | Lower cost than Straddle; needs larger move to profit               | **Unlimited** (large up move) or **large** (down move to 0) | **Limited** (total premium paid)               | 🟠 Medium      |
| **Butterfly Spread**                 | Combine 3 strike prices with Calls or Puts (1–2–1 ratio)      | Expect low volatility        | Limited profit and loss; suitable for stable markets                | **Limited** (peak at middle strike)                         | **Limited** (net premium paid)                 | 🟢 Low         |
## Bull Call Spread

You simultaneously **buys calls (lower strike) at a specific strike price** while also s**elling the same number of calls at a higher strike price**. Both call options will have the **same expiration date** and **underlying asset**.

You pay a **net debit** (the difference between the two premiums), which is your **maximum possible loss**.  
Your **maximum profit** is the **difference between the strikes minus the net debit**.

---

### **Structure**

| Position | Action | Strike | Premium | Effect |
|-----------|---------|---------|----------|---------|
| **Long Call** | Buy | Lower (K₁) | −C₁ | Right to buy at K₁ |
| **Short Call** | Sell | Higher (K₂) | +C₂ | Obligation to sell at K₂ |
| **Net Cost** |  |  | **C₁ − C₂** | = Max Loss |

---

### **Example**

Current stock price: **\$100**

| Action | Type | Strike | Premium |
|---------|------|---------|----------|
| **Buy** | Call | \$100 | **\$5** |
| **Sell** | Call | \$110 | **\$2** |

Net cost = **\$5 − \$2 = \$3 (debit)**  
→ **Max Loss = \$3 per share**

---

### **Payoff Formulas**

- **Long Call payoff:**  
  \[
  \max(0, S_T - K_1) - C_1
  \]

- **Short Call payoff:**  
  \[
  C_2 - \max(0, S_T - K_2)
  \]

- **Total payoff:**  
  \[
  \text{Payoff} = \max(0, S_T - K_1) - \max(0, S_T - K_2) - (\text{C₁ − C₂})
  \]

---

### **Scenario Analysis**

| **Stock Price ($S_T$)** | **Long Call (100)** | **Short Call (110)** | **Total P&L** |
|--------------------------|---------------------|----------------------|---------------|
| \$90  | 0 − 5 = –5 | +2 | **–3** |
| \$100 | 0 − 5 = –5 | +2 | **–3** |
| \$105 | +5 − 5 = 0 | +2 | **+2** |
| \$110 | +10 − 5 = +5 | +2 − 0 = +2 | **+7 (max)** |
| \$120 | +20 − 5 = +15 | +2 − 10 = –8 | **+7 (max)** |

---

### **Results Summary**

| Metric | Formula | Result |
|---------|----------|---------|
| **Maximum Loss** | = Net Premium Paid | **–\$3** |
| **Maximum Profit** | = (K₂ − K₁) − Net Premium | **+\$7** |
| **Break-even Point** | = K₁ + Net Premium | **\$103** |

---

### **Interpretation**

- If the stock **rises moderately** (e.g., to \$110), you earn a capped profit.  
- If the stock **stays below \$100**, both calls expire worthless, and you lose the \$3 premium.  
- If the stock **rises above \$110**, your profit is capped at **\$7**.

---

```plaintext
Profit ($)
     ^
  +7 |                 _________
     |                /
     |               /
     |              /
   0 |_____________/
     |             \
 -3  |--------------→  Stock Price ($)
        90   100   103   110   120
```

## Bear Put Spread

A **Bear Put Spread** is a **limited-risk, limited-reward bearish strategy**.  
It involves **buying one put option (higher strike)** and **selling another put option (lower strike)** with the **same expiration date**.  

You pay a **net debit** (the difference between the two premiums), which is your **maximum possible loss**.  
Your **maximum profit** is the **difference between the strikes minus the net debit**.

---

### **Structure**

| Position | Action | Strike | Premium | Effect |
|-----------|---------|---------|----------|---------|
| **Long Put** | Buy | Higher (K₁) | −P₁ | Right to sell at K₁ |
| **Short Put** | Sell | Lower (K₂) | +P₂ | Obligation to buy at K₂ |
| **Net Cost** |  |  | **P₁ − P₂** | = Max Loss |

---

### **Example**

Current stock price: **\$100**

| Action | Type | Strike | Premium |
|---------|------|---------|----------|
| **Buy** | Put | \$105 | **\$6** |
| **Sell** | Put | \$95 | **\$2** |

Net cost = **\$6 − \$2 = \$4 (debit)**  
→ **Max Loss = \$4 per share**

---

### **Payoff Formulas**

- **Long Put payoff:**  
  \[
  \max(0, K_1 - S_T) - P_1
  \]

- **Short Put payoff:**  
  \[
  P_2 - \max(0, K_2 - S_T)
  \]

- **Total payoff:**  
  \[
  \text{Payoff} = \max(0, K_1 - S_T) - \max(0, K_2 - S_T) - (\text{P₁ − P₂})
  \]

---

### **Scenario Analysis**

| **Stock Price ($S_T$)** | **Long Put (105)** | **Short Put (95)** | **Total P&L** |
|--------------------------|---------------------|----------------------|---------------|
| \$120 | 0 − 6 = –6 | +2 | **–4 (max loss)** |
| \$105 | 0 − 6 = –6 | +2 | **–4 (max loss)** |
| \$100 | +5 − 6 = –1 | +2 | **+1** |
| \$95  | +10 − 6 = +4 | +2 − 0 = +2 | **+6 (max)** |
| \$80  | +25 − 6 = +19 | +2 − 15 = –13 | **+6 (max)** |

---

### **Results Summary**

| Metric | Formula | Result |
|---------|----------|---------|
| **Maximum Loss** | = Net Premium Paid | **–\$4** |
| **Maximum Profit** | = (K₁ − K₂) − Net Premium | **+\$6** |
| **Break-even Point** | = K₁ − Net Premium | **\$101** |

---

### **Interpretation**

- If the stock **falls moderately** (e.g., to \$95), you earn a capped profit.  
- If the stock **stays above \$105**, both puts expire worthless, and you lose the \$4 premium.  
- If the stock **drops below \$95**, your profit is capped at **\$6**.

---

```plaintext
Profit ($)
     ^
  +6 |      _________
     |     /
     |    /
     |   /
   0 |__/______________
     |   \
 -4  |----\------------→  Stock Price ($)
         80   95  101  105  120
```



You do Bull Call Spread if you believe the market will smoothly go up. 
You do Bear Put Spread if you believe the market will smoothly go down. 

You lose your opportunity cost if the market go up or down sharply. 

You will lose if the volatility is too small that not reach the break-even point.

