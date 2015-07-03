<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 ie oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 ie oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 ie oldie" lang="en"> <![endif]-->
<!--[if IE 9]>    <html class="no-js ie9 ie" lang="en"> <![endif]-->
<!--[if gt IE 9]> <html class="no-js ie" lang="en"> <![endif]-->
<!--[if !IE]><!--> <html class="no-js no-ie" lang="en"> <!--<![endif]-->
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta name="description" content="KIOTO was founded in U.S. to make it easier to purchase Japanese fabric and paper products such as kimonos (Japanese style robes), bags, postcards made from washi (Japanese paper) and paper crafts." />
    <meta name="keywords" content="Japan, Japanese, fabric, cloth, paper, washi, kimono, robe, bag, paper craft, postcards, miniature model, Japanese traditions, art, waza, kokoro" />
    <meta name="google-site-verification" content="q6AIKs0v5j0xUe_MAqC4zN3bil2HhHoP23PAGInrudQ" />
    <!-- Open Graph Protocol -->
    <meta property="og:type"content="website">
    <meta property="og:url" content="http://www.kioto.com/">
    <meta property="og:image" content="http://www.kioto.com/img/kioto-logo-05-color_t.png">
    <meta property="og:title" content="KIOTO">
    <meta property="og:description" content="KIOTO was founded in U.S. to make it easier to purchase Japanese fabric and paper products such as kimonos (Japanese style robes), postcards made from washi (Japanese paper) and paper crafts." />
    <!-- End Open Graph Protocol -->

    <title>KIOTO</title>
    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico">
    <link href='http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/normalize.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/supersized.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/supersized.shutter.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/kioto-v6.css" type="text/css" media="screen"/>
    <script type="text/javascript" src="js/prefixfree.min.js"></script>
    <script type="text/javascript" src="js/modernizr.custom.04608.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery.easing.min.js"></script>
    <!--<script type="text/javascript" src="http://cdn.jquerytools.org/1.2.6/all/jquery.tools.min.js"></script>-->
    <script type="text/javascript" src="http://jquerytools.flowplayer.netdna-cdn.com/1.2.6/all/jquery.tools.min.js"></script>
    <!--[if lt IE 10]>
    <script type="text/javascript" src="js/jquery.textshadow.js"></script>
    <script src="https://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <script type="text/javascript" src="js/supersized.3.2.5.min.js"></script>
    <script type="text/javascript" src="js/supersized.shutter.min.js"></script>
    <script type="text/javascript" src="js/kioto-v10.js"></script>
    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-27818849-1']);
        _gaq.push(['_trackPageview']);
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>
</head>
<body>
<?php
include 'config.php';
if (DEBUG === true) {
?>
    <div id="debug">
        <p>server address: <?php echo $_SERVER['SERVER_ADDR']; ?></p>
        <p id="jsdebug"></p>
    </div>
<?php
}
?>
    <div id="noscript">Please enable Javascript on your web browser to display this website correctly.</div>
    <!-- Curtain for initial page load -->
    <div id="blind"></div>
    <!-- Arrow background navigation -->
    <a id="prevslide" class="load-item"></a>
    <a id="nextslide" class="load-item"></a>
    <!-- Logo & Main menu -->
	<div id="main-ctlr">
        <h1 id="logo">
            <a href="/">
                <img src="img/kioto-logo-05-color_t.png" width="228" height="257" />
            </a>
        </h1>
        <div id="menu">
            <a href="#company" id="company">
            <div>
            	<span class="menu-title">Company</span>
            	<span class="circle"></span>
            </div>
            </a>
            <a href="#products" id="products">
            <div>
            	<span class="menu-title">Products</span>
            	<span class="circle"></span>
            </div>
            </a>
            <a href="#inquiry" id="inquiry">
            <div>
            	<span class="menu-title">Inquiry</span>
            	<span class="circle"></span>
            </div>
            </a>
        </div>
    </div>
    <!-- Sliding Panels -->
    <div id="company-pane" class="pane">
        <div herf="" class="pane-close"></div>
        <div class="content">
            <h2>About US</h2>
            <div id="messages">
                <p>KIOTO was founded in U.S. to make it easier to purchase Japanese products such as kimonos (Japanese style robes), picture postcards made from washi (Japanese paper) and miniature model building kits.
                All without the inconvenience of customs paperwork or overseas wire transfers.
                We can accommodate orders of all sizes, and since everything is shipped from our U.S. warehouses, delivery times are remarkably short.</p>

                <p>Our hope is to introduce a time-honored beauty to people in the U.S. by faithfully preserving Japanese traditions, the “waza (art)” and “kokoro (soul)” of Kyoto culture. We invite you to enjoy authentic elements of Japan in your daily lives.</p>

            </div>
            <h3>KIOTO</h3>
            <div class="info">
                <div><h4>Phone</h4><span>(650) 373-2092</span></div>
                <div><h4>Fax</h4><span>(650) 373-2093</span></div>
            </div>
            <div class="info">
                <h4>Office</h4>
                <p>
                    533 Airport Blvd., Suite 400<br/>
                    Burlingame, CA  94010
                    <a href="map.html" id="open-map" class="button" rel="#map">map</a>
                </p>
            </div>
        </div>
    </div>
    <div id="products-pane" class="pane">
        <div class="pane-close"></div>
        <div class="content">
            <h2>Product Catalogs</h2>
            <ul id="catalogs">
                <li><a href="catalog/kimono+yukata+happi_v11.pdf" rel="#pdf-1">Kimono, Yukata & Happi</a></li>
                <li><a href="catalog/kids-yukata+jinbei_v10.pdf" rel="#pdf-2">Kid's Yukata & Jinbei</a></li>
                <li><a href="catalog/obi+kinran_v10.pdf" rel="#pdf-3">Obi & Kinran</a></li>
                <li><a href="catalog/wafu_bags_v10.pdf" rel="#pdf-4">Wafu Bags</a></li>
            </ul>
        </div>
    </div>
    <div id="inquiry-pane" class="pane">
        <div class="pane-close"></div>
        <div class="content">
            <h2>Orders & Inquiries</h2>
            <h3>If you have any inquiries relating to your order or any other aspect of our products, please contact us using this form below (or call <b>(650) 373-2092</b>). <br/>We will get back to you soon.</h3>
            <hr/>
            <!-- Customized Wufoo form comes here.-->
            <iframe height="470" allowTransparency="true" frameborder="0" scrolling="no" src="form.html"></iframe>
        </div>
    </div>
    <!-- div for fb-likebox button -->
    <!--
    <div id="fb">
        We are on <a href="fb-likebox.html" id="open-fb-likebox" class="button" rel="#fb-likebox">facebook</a>&nbsp;&nbsp;
    </div>
    -->
    <div id="thx-inquiry-msg">
        Thank you for your order / inquiry.<br/>
        We will get back to you soon!
    </div>
    <!-- div for fb-likebox overlay -->
    <div id="fb-likebox" class="overlay fb-likebox-overlay">
        <a class="close"></a>
        <div class="wrap-overlay"></div>
    </div>
    <!-- div for map overlay -->
    <div id="map" class="overlay map-overlay">
        <a class="close"></a>
        <div class="wrap-overlay"></div>
    </div>
    <!-- divs for pdf overlay -->
    <div id="pdf-1" class="overlay pdf-overlay">
        <a class="close"></a>
        <div class="wrap-overlay">
            <iframe class="pdf-frame" src="" frameborder="0" scrolling="no"></iframe>
            <div class="footer">
                <a href="" target="_blank" class="button download">Download Hi-Quality Catalog</a>
            </div>
        </div>
    </div>
    <div id="pdf-2" class="overlay pdf-overlay">
        <a class="close"></a>
        <div class="wrap-overlay">
            <iframe class="pdf-frame" src="" frameborder="0" scrolling="no"></iframe>
            <div class="footer">
                <a href="" target="_blank" class="button download">Download Hi-Quality Catalog</a>
            </div>
        </div>
    </div>
    <div id="pdf-3" class="overlay pdf-overlay">
        <a class="close"></a>
        <div class="wrap-overlay">
            <iframe class="pdf-frame" src="" frameborder="0" scrolling="no"></iframe>
            <div class="footer">
                <a href="" target="_blank" class="button download">Download Hi-Quality Catalog</a>
            </div>
        </div>
    </div>
    <div id="pdf-4" class="overlay pdf-overlay">
        <a class="close"></a>
        <div class="wrap-overlay">
            <iframe class="pdf-frame" src="" frameborder="0" scrolling="no"></iframe>
            <div class="footer">
                <a href="" target="_blank" class="button download">Download Hi-Quality Catalog</a>
            </div>
        </div>
    </div>
    <div id="pdf-5" class="overlay pdf-overlay">
        <a class="close"></a>
        <div class="wrap-overlay">
            <iframe class="pdf-frame" src="" frameborder="0" scrolling="no"></iframe>
            <div class="footer">
                <a href="" target="_blank" class="button download">Download Hi-Quality Catalog</a>
            </div>
        </div>
    </div>
    <div id="pdf-6" class="overlay pdf-overlay">
        <a class="close"></a>
        <div class="wrap-overlay">
            <iframe class="pdf-frame" src="" frameborder="0" scrolling="no"></iframe>
            <div class="footer">
                <a href="" target="_blank" class="button download">Download Hi-Quality Catalog</a>
            </div>
        </div>
    </div>
</body>
</html>
