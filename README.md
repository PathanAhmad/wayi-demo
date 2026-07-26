# wayi-demo (hosting mirror)

The Wayi AI demo deck, served at https://pathanahmad.github.io/wayi-demo/.

## Why it's a single file (please keep it that way)

`index.html` is the whole deck: markup, styles, script, mascots and scan
codes, with nothing fetched over the network. That is deliberate. The deck is
presented in rooms with bad wifi and handed around as a file, so it has to
open by double-click and render identically offline. Splitting it, or moving
an asset out to a URL, breaks the one property it is built for.

It is authored in the Spark-Evolved monorepo at `docs/demo/wayi-demo-deck.html`
and copied here to publish. Edit it there, not here.

## Not indexed

`robots.txt` and a `noindex` meta keep this out of search. It is a demo shown
to people who were given the link, not a public page.
