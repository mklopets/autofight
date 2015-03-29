<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>AutoFight</title>
	<script src="jquery-1.11.1.min.js"></script>
	<script src="autofight.js"></script>
	<style>
	* {
		margin: 0;
		padding: 0;
	}
	body {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
	.output {
		height: 100px;
		background: rgba(0,0,0,.5);
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		color: white;
		font-family: "Century Gothic", sans-serif;
	}
	.flag {
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/*display: none;*/
	}
	.horstripe {
		width: 33.33333vw;
		height: 100vh;
		float: left;
	}
	.verstripe {
		height: 33.33333vh;
		width: 100vw;
	}
	.solid {
		height: 100vh;
		width: 100vw;
	}
	</style>
</head>
<body>
	<div class="output"></div>
	<div class="flag"></div>
</body>
</html>