---
slug: "blur-it-up"
date: "2020-01-04"
title: "Implementing the blur-up effect for inline images in your Gatsby blog"
---

![timelapse](../assets/blur.jpg)

That image ☝️ has nothing to do with this post, but did you see it _blur up_? It started as a low resolution blur and then came into focus to reveal a high resolution stock photo. Pretty cool, right? This is a popular technique often seen in well known blogs like Medium. If you've ever wondered what's happening there, or if you already know the gist but want to know how to implement it on a Gatsby site, then this post is for you!

## What's happening

Let's start with a high level explanation of what's happening and why. High resolution images take up a lot of data. The image file at the beginning of this post is 140KB. That's not enormous, so it may load quickly on a good connection, but it's big enough to cause noticeable issues on a slower connection. Have you ever loaded a web page and noticed an image slowly fill in from top to bottom? It's not a good experience, and it's what we're trying to prevent with this blur-up technique.

_In case you've never noticed it before, at the end of this post I'll give you steps to recreate it using the image at the top._

This _blur-up_ technique is a common solution, and it works by creating a low resolution, blurry version of the image and using it as a placeholder, which the user will see when the page loads initially. This low-res image data is much smaller than the file that the user will eventually see, so it loads more quickly and will take up the same amount of space on the screen. When the actual high-res image is fully loaded, it replaces the blurry version. This creates a perception of better performance - even though the high-res image takes just as long to load - because we don't see the image creep in and grow slowly, and consequently we don't see content shifting around on the page.

## How to do it in Gatsby

As usual, the key to making this work in Gatsby is adding new plugins. Specifically, we want to configure [gatsby-remark-images](https://www.gatsbyjs.org/packages/gatsby-remark-images/) so that it [works with inline images when transformed with gatsby-transformer-remark](https://www.gatsbyjs.org/docs/working-with-images-in-markdown/#inline-images-with-gatsby-remark-images).

The guides here are good, but when I tried to apply the information to my blog, I found that it wasn't working; Gatsby was not transforming the images, so the page would always just load the high-res image and no blur-up effect ever occurred. [I filed an issue](https://github.com/gatsbyjs/gatsby/issues/20308) and a contributor jumped in quickly to help me out. Ultimately, it seemed there were two mistakes that prevented the transformation from occuring: the location of my assets, and the way that I was referencing them.

### Location, location, location

For starters, I had followed the guide for [sourcing from Netlify](https://www.gatsbyjs.org/docs/sourcing-from-netlify-cms/#setup), which included a configuration where media files were kept in the `static/assets` folder.

```yaml
media_folder: static/assets
public_folder: assets
```

The contributor advised me that the `static` folder gets special treatment from Gatsby, and that I'd be better off reworking my folder structure to mimc the setup of [the gatsby-starter-blog repo](https://github.com/gatsbyjs/gatsby-starter-blog). I took his advice and wound up with this as my configuration:

```yaml
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content/projects`,
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content/blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content/assets`,
        path: `${__dirname}/content/assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 813,
            },
          },
```

This didn't quite do the trick though, as my images still were not blurring up. The issue turned out to be the way I was referencing the files.

### Relative references

I think I was a bit thrown off by the NetlifyCMS configuration.

```yaml
media_folder: content/assets
public_folder: assets
```

This made me assume that I should reference my files like `/assets/blur.jpg`. I remained stuck, so the contributor was kind enough to submit a pull request to my repo with a working version of the code. It turned out that I needed to reference my files using the path relative to the post. In other words,

```markdown
![timelapse](../assets/blur.jpg)
```

Once I modified my posts to use relative paths in this way, I found that the images were blurring up perfectly.

## Try this at home

If you've never observed the problem that blur-up addresses, you might be privileged with a high speed connection! But may users around the world are not quite so blessed, and that's not limited to folks in countries without good infrastructure; mobile users here in the US will face the same issues. Fortunately, it's possible to simulate those connection speeds from your desktop web browser, so we can make sure that our websites work well for everyone from the comfort of our development machines!

Here's how you can observe what users on slower connections are experiencing when you put a high resolution image on your web page.

1. Right-click the image and open it in a new tab.
1. Open your developer tools.
1. Click the network tab, where you'll find a menu that lets you simulate different connection speeds.

   a. In Chrome, this menu has the text _Online ▾_. Open this menu and select _Fast 3G_. Then reload the page. For me, this consistently creates the effect of the image creeping in gradually.

   b. Firefox has a menu that says _No Throttling_. Open this menu and select _Good 3G_. In this case, I had to clear the browser cache and reload multiple times to observe the effect, so if you don't notice it at first, keep trying!

If you follow the above steps, you should see the performance issue we're trying to prevent, and hopefully you will understand why the _blur-up_ technique is often utilized to make high-res image loading into a more pleasant experience for the web.

Thanks for reading!
