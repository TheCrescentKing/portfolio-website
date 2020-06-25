<?php 
	global $score;
	global $grille;
	global $perdu;
	require_once 'fonctions-2048.php';
	write_logs($_GET['action-joueur']);
	if ($_GET['action-joueur']=="Nouvelle Partie"){
		nouvelle_partie();
	}
	else{
		$action = $_GET['action-joueur'];
		fichier_vers_matrice();
		if(!grille_pleine()){
			switch ($action) {
			case "Gauche":
				for($d = 0; $d < 4; $d++){
					decalage_ligne_gauche($d);
				}
				break;
			case "Droite":
				for($d = 0; $d < 4; $d++){
					decalage_ligne_droite($d);
				}
				break;
			case "Haut":
				for ($d = 0; $d < 4; $d++){
					decalage_col_haut($d);
				}
				break;
			case "Bas":
				for ($d = 0; $d < 4; $d++){
					decalage_col_bas($d);
				}
				break;
			}
			place_nouveau_nb();
		}
		else{
			$perdu = true;
		}
	}
	matrice_vers_fichier();
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"></meta>
<link href="https://fonts.googleapis.com/css?family=Russo+One" rel="stylesheet">
<title>Le jeu 2048</title>
<link rel="stylesheet" href="style2048.css" />
</head>
<body>
<main class="inline-block-center">
<div>
<h1 class="title">Le jeu 2048</h1>
<h2 id="rules">Régles :</h2>
<p class="paragraph-left">Le but du jeu est de faire glisser des tuiles sur une grille, pour combiner le
s tuiles de mmes valeurs et créer ainsi une tuile portant le nombre 2048. Le joueur peut toutefois conti
nuer à jouer après cet objectif atteint pour faire le meilleur score possible.
Le jeu se présente sous la forme d'une grille 4*4. Au début de la partie, deux cases contiennent un chif
fre (2 ou 4). Les nombres peuvent se déplacer à droite, à gauche, en haut ou en bas. Quand deux cases de
 mme valeur se rencontrent, elles fusionnent en une case qui vaut la somme des 2 cases fusionnées. Après
 chaque action du joueur, une nouvelle case apparat avec pour valeur 2 ou 4. Le but est donc d'obtenir u
ne case valant 2048 avant que la grille ne soit pleine et qu'aucun mouvement ne soit plus possible. Si p
lus aucun mouvement n'est possible, la partie est perdue.</p>
<a href="http://perso.univ-lyon1.fr/olivier.gluck/supports_enseig.html#LIFASR2" target="_blank"><p id="l
ienUE">Lien vers la page de l'UE</p></a>
<form style="display: inline" id="buttonActualiser" action="https://lifasr2.univ-lyon1.fr/john.mcmemeny/
jeu-2048/index.html" method="get">
  <button>Acualiser la page</button>
</form>
</div>
<div>
<h2 id="score">Score : <?php echo $score ?></h2>
<table class="game" id="cssTable">
<?php
for ($tr = 0; $tr < 4; $tr++){
	echo "<tr>";
	for ($td = 0; $td < 4; $td++){
		echo "<td>";
		affiche_case($tr,$td);
		echo "</td>";
	}
	echo "</tr>";
}
?>
</table>
<form name="jeu-2048" method="get" action="jeu-2048.php">
	<input id="nouvellePartie" type="submit" name="action-joueur" value="Nouvelle Partie" />
	<div class="buttonDirections">
	<input type="submit" name="action-joueur" value="Gauche" />
	<input type="submit" name="action-joueur" value="Haut" />
	<input type="submit" name="action-joueur" value="Bas" />
	<input type="submit" name="action-joueur" value="Droite" />
	</div>
</form>
<p>
<?php
global $perdu;
if($perdu == true){
	echo "PERDU!";
} 
?></p>
</div>
</main>
</body>
</html>
