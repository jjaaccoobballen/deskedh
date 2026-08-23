# deskedh

**Look at the world, you can't see.**

deskedh makes real-world data digestible — small desk screens, each dedicated
to one live feed: **Earth** (earthquakes & volcanoes), **Weather** (temp, UV,
AQI, pollen, forecast), and **Surf** (live shore/wave data).

This repo contains the marketing/landing website: plain HTML/CSS/JS, no
build step required.

## Structure

```
index.html          Landing page markup
css/style.css        Dark-glass, neon-accent theme
js/main.js            Scroll-reveal + reserved space for custom animations
assets/images/        Product photography + logo
```

## Running locally

No build step — just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Pricing model

| Item | Price |
|---|---|
| Starter Pack (1 screen + 1 stand) | £40 |
| Extra screen (Earth / Weather / Surf) | £25 |
| Stand | £8 |

## TODO

- [ ] Wire up waitlist form to a real Formspree endpoint (replace `YOUR_FORM_ID` in `index.html`)
- [ ] Drop in custom hero/product animations (see reserved section in `js/main.js`)
