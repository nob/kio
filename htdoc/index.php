<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 ie oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 ie oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 ie oldie" lang="en"> <![endif]-->
<!--[if IE 9]>    <html class="no-js ie9 ie" lang="en"> <![endif]-->
<!--[if gt IE 9]> <html class="no-js ie" lang="en"> <![endif]-->
<!--[if !IE]><!--> <html class="no-js no-ie" lang="en"> <!--<![endif]-->
<head>
    <title>KIOTO, Inc.</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta name="description" content="Our hope is to introduce a time-honored beauty to people in the U.S. by faithfully preserving Japanese traditions, the “waza (art)” and “kokoro (soul)” of Kyoto culture. We invite you to enjoy authentic elements of Japan in your daily lives." />
    <meta name="keywords" content="kimono, robe, Japanese, Japan, Kyoto, paper craft, paper, washi, miniature model, Japanese traditions, art, waza, kokoro" />
    <meta name="google-site-verification" content="q6AIKs0v5j0xUe_MAqC4zN3bil2HhHoP23PAGInrudQ" />
    <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico">
    <link href='http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/normalize.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/supersized.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/supersized.shutter.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/kioto-v2.css" type="text/css" media="screen"/>
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
    <script type="text/javascript" src="js/kioto-v3.js"></script>
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
            <a href="" id="company">
            <div>
            	<span class="menu-title">Company</span>
            	<span class="circle"></span>
            </div>
            </a>
            <a href="" id="products">
            <div>
            	<span class="menu-title">Products</span>
            	<span class="circle"></span>
            </div>
            </a>
            <a href="" id="inquiry">
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
                <p>KIOTO, Inc. was founded in U.S. to make it easier to purchase Japanese products such as kimonos (Japanese style robes), picture postcards made from washi (Japanese paper) and miniature model building kits. 
                All without the inconvenience of customs paperwork or overseas wire transfers. 
                We can accommodate orders of all sizes, and since everything is shipped from our U.S. warehouses, delivery times are remarkably short.</p>

                <p>Our hope is to introduce a time-honored beauty to people in the U.S. by faithfully preserving Japanese traditions, the “waza (art)” and “kokoro (soul)” of Kyoto culture. We invite you to enjoy authentic elements of Japan in your daily lives.</p>

            </div>
            <h3>KIOTO, Inc.</h3>
            <div class="info">
                <div><h4>Phone</h4><span>(650) 867-7675</span></div>
                <div><h4>Fax</h4><span>(650) 373-2093</span></div>
            </div>
            <div class="info">
                <h4>Office & Showroom</h4>
                <p>
                    1818 Gilbreth Road, Suite 126<br/>
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
                <li><a href="catalog/kimono_2012_v30.pdf" rel="#pdf-1">Kimono 2012</a></li>
                <li>
                    <span>Paper Craft 2012</span>
                    <ul>
                    <li><a href="catalog/paper_craft_j_scene_v30.pdf" rel="#pdf-2">Japanese Scene series</a></li>
                    <li><a href="catalog/paper_craft_diorama_v30.pdf" rel="#pdf-3">Diorama series</a></li>
                    <li><a href="catalog/paper_craft_petit_v50.pdf" rel="#pdf-4">Petit series</a></li>
                    </ul>
                </li>
                <li><a href="catalog/paper_goods_2012_v30.pdf" rel="#pdf-5">Paper goods 2012</a></li>
            <ul>
        </div>
    </div>
    <div id="inquiry-pane" class="pane">
        <div class="pane-close"></div>
        <div class="content">
            <h2>Orders & Inquiries</h2> 
            <h3>If you have any inquiries relating to your order or any other aspect of our products, please contact us using this form below (or call <b>650-867-7675</b>). <br/>We will get back to you soon.</h3>
            <hr/>
            <!-- Customized Wufoo form comes here.-->
            <iframe height="470" allowTransparency="true" frameborder="0" scrolling="no" src="form.html"></iframe>
        </div>
    </div>
    <div id="thx-inquiry-msg">
        Thank you for your order / inquiry.<br/>
        We will get back to you soon!
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
                <a href="" target="_blank" class="button download">Download Catalog</a>
            </div> 
        </div>
    </div>
    <div id="pdf-2" class="overlay pdf-overlay"> 
        <a class="close"></a>
        <div class="wrap-overlay">
            <iframe class="pdf-frame" src="" frameborder="0" scrolling="no"></iframe>
            <div class="footer">
                <a href="" target="_blank" class="button download">Download Catalog</a>
            </div> 
        </div>
    </div>
    <div id="pdf-3" class="overlay pdf-overlay"> 
        <a class="close"></a>
        <div class="wrap-overlay">
            <iframe class="pdf-frame" src="" frameborder="0" scrolling="no"></iframe>
            <div class="footer">
                <a href="" target="_blank" class="button download">Download Catalog</a>
            </div> 
        </div>
    </div>
    <div id="pdf-4" class="overlay pdf-overlay"> 
        <a class="close"></a>
        <div class="wrap-overlay">
            <iframe class="pdf-frame" src="" frameborder="0" scrolling="no"></iframe>
            <div class="footer">
                <a href="" target="_blank" class="button download">Download Catalog</a>
            </div> 
        </div>
    </div>
    <div id="pdf-5" class="overlay pdf-overlay"> 
        <a class="close"></a>
        <div class="wrap-overlay">
            <iframe class="pdf-frame" src="" frameborder="0" scrolling="no"></iframe>
            <div class="footer">
                <a href="" target="_blank" class="button download">Download Catalog</a>
            </div> 
        </div>
    </div>
</body>
</html>

