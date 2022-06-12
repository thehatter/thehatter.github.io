---
layout: post
title:  "Simple hash generation and parsing"
date:   2015-12-05 22:00:00
lang: en
share: private
hot: true
cover_image: "post_cover_python_1.png"
tags: scripts python parsing
---
{::options parse_block_html="true" /}


<section class="summary">
## Summary

Today i will create script to:

- Generate hash list for group of images (about 6-15k)
- Transform it to .xml document
</section>

<section class="standart">
## Hash generator exempel



{% highlight python %}

# import os to execute linux commands
import os

# import eml.etree for xml manipulations
import xml.etree.cElementTree as ET

# import minidom to prettify xml
import xml.dom.minidom

# import datetime to get current time
from datetime import datetime

startTime = datetime.now() # varible that store datetime of script start


# create file with hashes using sha256
# os.system("sha256sum ~/somedir/*.{jpg,png,gif,jpeg} > hash_list.txt")

# create file with hashes using md5
os.system("md5sum ~/somedir/*.{jpg,png,gif,jpeg} > hash_list.txt")


#show generation (md5sum/sha256sum) work time
s = datetime.now() - startTime
print 'first part took about: %s' % s


root = ET.Element("root")
doc = ET.SubElement(root, "doc")


for line in open('hash_list.txt'): # create objects for hashes and names in every line
    current_group = ET.SubElement(doc, 'img_item', )
    current_hash = line.split(' ', 1)[0]
    current_path = line.split(' ', 1)[1]
    current_name = current_path.rsplit('/',1)[-1].rstrip()
    ET.SubElement(current_group, "hash", value = current_hash).text = current_hash
    ET.SubElement(current_group, "img_name", value = current_name).text = current_name


# convert tree to string
tree = ET.tostring(root)
xml = xml.dom.minidom.parseString(tree)
pretty_xml_as_string = xml.toprettyxml() # and format it!

xml_file = open("hash.xml", "w+")
xml_file.write(pretty_xml_as_string)
xml_file.close

# show script work time
s = datetime.now() - startTime
print 'it all took about: %s' % s
{% endhighlight %}

</section>

