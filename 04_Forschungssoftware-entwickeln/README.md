---
title: "Forschungssoftware entwickeln"
chapter: "04"
layout: default
permalink: /04-forschungssoftware-entwickeln/
---

## Trockenübungen

1. Was ist eine Programmiersprache? 
1. Zählen Sie mindestens drei auf.
1. Wozu werden ein Compiler oder Interpreter benötigt?
1. Wenn `x = 3`, welche Ausgabe erzeugt dann folgender Pseudocode?
   ``` 
   if x > 3 then
     print "a"
   else
     print "b"
   end if
   ```
1. Und was ist mit folgendem Pseudocode (`x = 3`)?
   ``` 
   while x >= 0
     print x
	 decrease x by 1
   end while
   ```
1. Beschreiben Sie die zentralen Unterschiede zwischen unit, integration und acceptance tests.
1. Was ist im Kontext von Forschungssoftware eine "pipeline"?


## Praxisübungen

Übenübenüben Sie. Dazu eignen sich zahlreiche Kurse online, von denen einige hier verlinkt sind. Anschließend können Sie sich den untenstehenden weiteren Praxisübungen zuwenden.

- textbasierte Einstiegs-Tutorials bei w3schools.com für [Python](https://www.w3schools.com/python/default.asp) und [R](https://www.w3schools.com/r/default.asp)
- interaktiver Python-Kurs: [sololearn.com](https://www.sololearn.com/learn/languages/python)
- Liste von kostenfreien Online-Informatik/Programmier-Kursen mit US-Fokus: [code.org](https://code.org/beyond/extended-learning#free)
- kostenpflichtige Online-Kurse zu einer Vielzahl von Themen/Levels/Sprachen: codecademy.com für [Python](https://www.codecademy.com/catalog/language/python) und [R](https://www.codecademy.com/catalog/language/r), udemy.com für [Python](https://www.udemy.com/topic/python/) und [R](https://www.udemy.com/topic/r-programming-language/), datacamp.com für [Python](https://www.datacamp.com/courses/intro-to-python-for-data-science) und [R](https://www.datacamp.com/courses/free-introduction-to-r)
- konkrete Übungsaufgaben mit viel Feedback am eigenen Code, user-generiert: codewars.com für [Python](https://www.codewars.com/kata/python) und [R](https://www.codewars.com/kata/r)
- Online-Gratis-Buch für R im Rahmen der Computational Social Sciences von [Mark Hoffman](https://bookdown.org/markhoff/css/installing-r-and-rstudio.html)
- deutschsprachiges Online-Gratis-Buch für R im Rahmen der CCS von [Julian Unkel](https://bookdown.org/joone/ComputationalMethods/firststeps.html)

Die Schaltjahr-Beispiele sind im Lehrbuch als Pseudocode umgesetzt. Suchen Sie sich eine Programmiersprache Ihrer Wahl und implementieren Sie die Pseudocodes entlang der folgenden Aufgaben:

1. Schreiben Sie eine Funktion (`are_you_a_leap_year`), die einen Parameter (`jahr`) erhält und entweder `true` oder `false` zurückgibt.
1. Rufen Sie die Funktion mit ein paar Jahreszahlen auf (z.B. 2023, 2000, 2038).
1. Schreiben Sie eine `for`-Schleife, die die Funktion für die Jahre 1900 bis 1950 aufruft und dabei nur jene Jahreszahlen ausgibt, die auch wirklich ein Schaltjahr darstellen.
1. Schreiben Sie eine `while`-Schleife, die die Jahre ab 2023 aufsteigend durchläuft, bis es ein Schaltjahr findet, das es auch ausgibt.


## Lösungsansätze

Ab hier folgen nun verschiedene Lösungswege zu den oben vorgestellten Übungen. Damit Sie die nicht "versehentlich" überscrollen und so Ihrer Übungsmöglichkeiten beraubt werden, folgt hier zunächst ein visueller Bruch.

![Winkende weiße Katze als GIF](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

### Trockenübungen

1. Sprache, in der für einen bestimmten Anwendungsfall Anweisungen geschrieben sind, die ein Computer benötigt, um für den Anwendungsfall nötige Aufgaben zu bewältigen.
1. Python, R, C, C++, C#, Java, JavaScript, PHP ... (die [Liste](https://de.wikipedia.org/wiki/Liste_von_Programmiersprachen) ist schier endlos, HTML gehört aber nicht dazu)
1. Um für Menschen lesbaren Code in Maschinencode zu übersetzen.
1. `b`
1. `3210`
1. "unit" prüft spezifische Funktionen, "integration" das Zusammenspiel von verschiedenen Teilen/Modulen der Forschungssoftware und "acceptance" fokussiert auf die Anwendung bei Nutzenden.
1. Eine konfigurierte Liste an Aufgaben, die bei neuen Versionen (im Rahmen des Deployments) automatisch durchlaufen werden (sollen).

### Praxisübungen

Hier die Lösungen mit Python:

```python
def are_you_a_leap_year(jahr):
    if jahr % 4 == 0:
        if jahr % 100 == 0:
            if jahr % 400 == 0:
                return True
        else:
            return True
    return False

print(are_you_a_leap_year(2023))
print(are_you_a_leap_year(2000))
print(are_you_a_leap_year(2038))

for jahr in range(1900, 1950):
    if are_you_a_leap_year(jahr):
        print(jahr)

jahr = 2023
while not are_you_a_leap_year(jahr):
    jahr = jahr + 1

print(jahr)
```


Und hier mit R:

```r
are_you_a_leap_year <- function (jahr) {
  if (jahr %% 4 == 0) {
    if (jahr %% 100 == 0) {
      if (jahr %% 400 == 0) {
        return(TRUE)
      }
    } else {
      return(TRUE)
    }
  }
  return(FALSE)
}

are_you_a_leap_year(2023)
are_you_a_leap_year(2000)
are_you_a_leap_year(2038)

for (jahr in 1900:1950) {
  if (are_you_a_leap_year(jahr)) {
    print(jahr)
    
  }
}

jahr <- 2023
while (!are_you_a_leap_year(jahr)) {
  jahr <- jahr + 1
}
print(jahr)
```