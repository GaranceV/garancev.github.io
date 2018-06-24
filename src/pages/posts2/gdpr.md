# GDPR from the developer's point of view
A few months ago, my manager starting telling us about the GDPR, how he'd been working with our product management team to define what we had to do. I started reading a lot of documentation about user consent, the principles or targeting, and experimenting with our different options. Now, at Marfeel, we have several solutions, and each needed a custom answer to the GDPR requirements:
* Our usual product, Touch
* Our AMP pages implementations
* Our native apps
* Our Marfeel Kernel, a lightweight crossover between Marfeel and AMP.

The solutions look the same to the user: They get a big popup, asking them to agree to our use of cookies, or to select which types of cookies they agree with (Yes to Marketing, no to Audience analytics, ...). However, for our Touch product, we wanted to, and could, do everything ourselves, whereas in AMP, we had to rely on what AMP provides, which is a new HTML tag, aptly named "amp-consent".
Since the AMP solution mostly consists of following their implementation guidelines, it's not the one I will focus on, here. If you want to know more about, I encourage you to go and read their docs!
>>Docs about amp-consent

Now, when I started working on our custom consent solution for Touch, we had already experimented with several "approved" solution, recommended by the IAB (International Advertising Bureau):
Smart
Quantcast
This gave us great insights, as to what we wanted our solution to do, and what we didn't want it to do!
Our solution had to be:
* lightning-fast, to avoid disrupting the user experience
* highly configurable, to be able to add vendors, or to have different behaviours depending on the reader's country.
* scalable, as we want 1 solution, implemented once, to work for all our clients accross the globe.


From our side of the GDPR, our obligations are:
* Ask for users' consent if they are in a EEA country, or if they visit a website based in a EEA country, no matter where they are themselves.
For instance, we noticed that those solution needed up to 4 seconds to load, even on a wifi connection. Our had to be lightning-fast
