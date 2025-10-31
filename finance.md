# Option


$S_T$,Spot price at expiration
$K$,Strike price
$C$,Call premium
$P$,Put premium


| **Strategy**   | **Action**    | **Market Outlook** | **Profit & Loss** | **Payoff Formula** |
|----------------|---------------|--------------------|-------------------|--------------------|
| **Long Call**  | Buy Call      | Bullish            | Unlimited ↑, Limited ↓ | $\max(0, S_T - K) - C$ |
| **Short Call** | Sell Call     | Bearish/Neutral    | Limited ↑, Unlimited ↓ | $C - \max(0, S_T - K)$ |
| **Long Put**   | Buy Put       | Bearish            | Large ↑, Limited ↓     | $\max(0, K - S_T) - P$ |
| **Short Put**  | Sell Put      | Bullish/Neutral    | Limited ↑, Large ↓     | $P - \max(0, K - S_T)$ |




| **Strategy Name**                    | **Construction Method**                                       | **Market Outlook**           | **Characteristics**                                                 | **Profit Potential**                                        | **Maximum Loss**                               | **Risk Level** |
| ------------------------------------ | ------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------- | -------------- |
| **Covered Call** (**Buy-write**)     | Long stock + Short call                                       | Neutral to slightly bullish  | Lowers cost, but caps potential upside                              | **Limited** (up to strike + premium)                        | **Large** (if stock falls to 0, minus premium) | 🟠 Medium      |
| **Protective Put** (**Married Put**) | Long stock + Long put                                         | Bullish with bearish concern | Like insurance; protects existing holdings                          | **Unlimited** (stock upside)                                | **Limited** (premium of put)                   | 🟢 Low         |
| **Bull Spread**                      | Buy a Call with lower strike + Sell a Call with higher strike | Bullish                      | Limited profit and loss; lower cost                                 | **Limited** (difference between strikes − net premium)      | **Limited** (net premium paid)                 | 🟢 Low         |
| **Bear Spread**                      | Buy a Put with higher strike + Sell a Put with lower strike   | Bearish                      | Limited profit and loss                                             | **Limited** (difference between strikes − net premium)      | **Limited** (net premium paid)                 | 🟢 Low         |
| **Straddle**                         | Buy both a Call and a Put at the same strike price            | Expect high volatility       | Profits from large moves in either direction; loss = double premium | **Unlimited** (large up move) or **large** (down move to 0) | **Limited** (total premium paid)               | 🟠 Medium–High |
| **Strangle**                         | Buy a Call and a Put with different strike prices             | Expect high volatility       | Lower cost than Straddle; needs larger move to profit               | **Unlimited** (large up move) or **large** (down move to 0) | **Limited** (total premium paid)               | 🟠 Medium      |
| **Butterfly Spread**                 | Combine 3 strike prices with Calls or Puts (1–2–1 ratio)      | Expect low volatility        | Limited profit and loss; suitable for stable markets                | **Limited** (peak at middle strike)                         | **Limited** (net premium paid)                 | 🟢 Low         |



## Covered Call (Buy-Write) long stock + short call
**Naked Call** means you short a call without underlying asset, which is highly risky while profit is higher as well. But if you are not so sure about this bearish, you can use **Covered Call** to lower risk with more stable profit.

Covered Call and Buy-Write are same strategy but different timing. They both involving owning certain underlying asset, and you sell a call option on it (*This originally means bearish, but once you own the underlying asset instead of sell it naked, that means neutral or slightly bullish*)

If you already hold the underlying stock, and then you sell a call option, which is **Covered Call**. 
If you buy the stock and sell the call option simultaneously, which is **Buy-Write**.

***They are exactly the same strategy.***
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
as the seller it is your obligation to sell it at K = \$110, your option payoff is $C10 - \max(0, 200 - 110) = 10 - 90 = +-\$80$, 
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

## Protected Put (Married Put) Long stock + long put
Similar as above, 