<?php
	$cfg = array();
	$cfg[0] = isset($_GET['p']) ? (int)$_GET['p'] : 4000; 	// Particle count
	$cfg[1] = isset($_GET['r']) ? (int)$_GET['r'] : 100;	// Radius
	$cfg[2] = isset($_GET['f']) ? (int)$_GET['f'] : 1000;	// FoV (Field of View)
?><!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>3D Particle Sphere</title>
		<link rel="stylesheet" type="text/css" href="style/default.css">
		<script type="text/javascript" src="script/point3d.js"></script>
		<script type="text/javascript" src="script/sphere3d.js"></script>
		<script type="text/javascript">
			window.onload = function() {
				new Sphere3D('stage', <?php echo $cfg[0]; ?>, <?php echo $cfg[1]; ?>, <?php echo $cfg[2]; ?>);
			};
		</script>
	</head>
	<body>
		<canvas id="stage" width="800" height="800"></canvas>
	</body>
</html>