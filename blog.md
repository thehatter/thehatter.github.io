---
layout: default_with_title
title: Blog
permalink: /blog/
order: 1
lang: ru
ref: blog
---

<div class="home">

<div class="hot_block items_in_3">
  {% assign hot_posts=site.posts | where: "hot", "true" %}
  {% for post in hot_posts %}
    {% unless post.img_on_bg_style %}
      <a class="hot_post" href="{{ post.url | prepend: site.baseurl }}">
    {% else %}
      <a class="hot_post" href="{{ post.url | prepend: site.baseurl }}" style="background: url('{{ post.cover_image | prepend: site.post_assets_url }}')">
    {% endunless %}
      {% if post.cover_image and post.img_on_bg_style != true %}
        <span class="img">
          <img alt="{{post.title}}" src="{{ post.cover_image | prepend: site.post_assets_url }}">
        </span>
      {% endif %}
      {% if post.cover_image == undefined %}
        <span class="img">
          <img alt="{{post.title}}" src="{{ site.post_cover_placeholder }}">
        </span>
      {% endif %}

      <span class="over_img">
        <span class="date">{{ post.date | date: "%d.%m.%Y" }}</span>
        <span class="title"> {{post.title}} </span>
      </span>
    </a>
  {% endfor %}
</div>


  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>

</div>
