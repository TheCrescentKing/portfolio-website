<?php
function affiche_sept_variables(){
        echo "HTTP_USER_AGENT="; echo $_SERVER['HTTP_USER_AGENT']; echo "<br />";
        echo "HTTP_HOST="; echo $_SERVER['HTTP_HOST']; echo "<br />";
        echo "DOCUMENT_ROOT="; echo $_SERVER['DOCUMENT_ROOT']; echo "<br />";
        echo "SCRIPT_FILENAME="; echo $_SERVER['SCRIPT_FILENAME']; echo "<br />";
        echo "PHP_SELF="; echo $_SERVER['PHP_SELF']; echo "<br />";
        echo "REQUEST_URI="; echo $_SERVER['REQUEST_URI']; echo "<br />";
        echo "action-joueur="; echo $_GET['action-joueur']; echo "<br />";
}
function write_logs($mesg){
        file_put_contents("logs-2048.txt","$mesg\n", FILE_APPEND);
}
function affiche_logs($nbl){
        $logs = file("logs-2048.txt");
        foreach ($logs as $i => $line){
        echo "Ligne ".($i+1).":".htmlspecialchars($line)."<br />\n";
        }
}
function fichier_vers_score(){
	global $score;
	$score = file_get_contents("score.txt");
}
function score_vers_fichier(){
	global $score;
	file_put_contents("score.txt", $score);
}
function affiche_score(){
	global $score;
	fichier_vers_score();
	$score++;
	score_vers_fichier();
}
function nouvelle_partie(){
	global $score, $grille;
	$score = 0;
	$grille = array_fill(0,4,array_fill(0,4,0));
	for ($g = 0; $g < 2; $g++){
		$tableauRand = tirage_position_vide();
		$grille[$tableauRand[0]][$tableauRand[1]] = 2;
	}
	
}
function matrice_vers_fichier(){
	global $grille;
	file_put_contents("grille.txt", '');
	for ($i = 0; $i <= 3; $i++){
		for ($k = 0; $k <= 3; $k++){
			if ($k==3){
				file_put_contents("grille.txt", $grille[$i][$k]."\n", FILE_APPEND);
			}
			else{
			file_put_contents("grille.txt", $grille[$i][$k]." ", FILE_APPEND);
			}
		}
	}
}	
function fichier_vers_matrice(){
	global $score, $grille;
	$chaine = file_get_contents("grille.txt");
	$chaine = str_replace("\n", " ", $chaine);
	$valeurs = explode(' ', $chaine);
	$n = 0;
	for ($i = 0; $i <= 3; $i++){
		for ($k = 0; $k <= 3; $k++){
			$grille[$i][$k] = (int) ($valeurs[$n]);
			$n++;
		}
	}
}
function affiche_case($i,$k){
	global $grille;
	if ($grille[$i][$k] != 0){
		echo $grille[$i][$k];
	}
}
function tirage_position_vide(){
	global $grille;
	do {
	$x = rand(0,3);
	$y = rand(0,3);	
	} while($grille[$x][$y] != 0);
	$tableauRand[0] = $x;
	$tableauRand[1] = $y;
	return $tableauRand;
}
function grille_pleine(){
	global $grille;
	for($i = 0; $i < 4; $i++){
		for($k = 0; $k < 4; $k++){
			if ($grille[$i][$k] == 0){
				return false;
			}
		}
	}
	return true;
}
function tirage_2ou4(){
	$g = rand(1,2);
	$g = $g*2;
	return $g;
}
function place_nouveau_nb(){
	global $grille;
	$nb = tirage_2ou4();
	$tableauRand = tirage_position_vide();
	$grille[$tableauRand[0]][$tableauRand[1]] = $nb;
	return $tableauRand;
}
function decalage_ligne_gauche($l){
	global $grille;
	$ligne = array_fill(0,4,0);
	$i = 0;
	for ($k = 0; $k < 4; $k++){
		if ($grille[$l][$k] != 0){
			$ligne[$i] = $grille[$l][$k];
			$i++;
		}
	}
	$grille[$l] = $ligne;
}
function decalage_ligne_droite($l){
	global $grille;
	$ligne = array_fill(0,4,0);
	$i = 3;
	for ($k = 3; $k >= 0; $k++){
		if($grille[$l][$k] != 0){
			$ligne[$i] = $grille[$l][$k];
			$i--;
		}
	}
	$grille[$l] = $ligne;
}
function decalage_col_haut($c){
	global $grille;
	$colonne = array_fill(0,4,0);
	$i = 0;
	for ($k = 0; $k < 4; $k++){
		if($grille[$k][$c] != 0){
			$colonne[$i] = $grille[$k][$c];
			$i++;
		}
	}
	for ($k = 0; $k < 4; $k++){
		$grille[$k][$c] = $colonne[$k];
	}
}
function decalage_col_bas($c){
	global $grille;
	$colonne = array_fill(0,4,0);
	$i = 3;
	for ($k = 3; $k >= 0; $k++){
		if($grille[$k][$c] != 0){
			$colonne[$i] = $grille[$k][$c];
			$i--;
		}
	}
	for ($k = 0; $k < 4; $k++){
		$grille[$k][$c] = $colonne[$k];
	}
}
?>
