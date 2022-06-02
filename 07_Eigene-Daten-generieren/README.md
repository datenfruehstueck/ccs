# Eigene Daten generieren

## Trockenübungen

1. Erklären Sie den zentralen Grenzwertsatz.
1. Was besagt das Gesetz der großen Zahlen?
1. Aus Sicht der Umwelt sind gerade generierend simulierende Verfahren sehr ressourcenhungrig. Welche Aspekte spielen hierbei aus ethischer Perspektive eine Rolle?
1. Welche Anwendungszwecke und Vorteile bieten (a) Monte-Carlo-Simulationen, (b) Bootstrapping und (c) Agentenbasierte Modellierung?

## Praxisübungen

Wenig überraschend gilt es hier, die Pseudocodes in tatsächlichen Quellcode zu überführen. Die Praxisübungen sind hier also insbesondere auch sehr gut Programmierübungen. Achten Sie darauf, die Anzahl durchzuführender Simulationen nicht zu groß zu konfigurieren, um den Computer nicht unnötig zu belasten.

### Monte-Carlo-Simulation

Programmieren Sie den Pseudocode zur Monte-Carlo-Simulation. Setzen Sie dafür zunächst den Seed auf einen festen Startwert (welcher das ist, ist Ihnen überlassen). Entwickeln Sie anschließend eine Schleife, die in lediglich zehn (10!) Durchläufen (`i`) jeweils eine zufällige Annahme darüber trifft, in wieviel Prozent der Fälle Videos tatsächlich unkritisch-positiv über Dubai berichten (`actually_positive`). Anschließend wühlen Sie sich in einer weiteren Schleife durch die Werte von 30 bis 150 (`n`), die die Anzahl gemeinsam codierter Videos darstellt. Je Wert schließlich variieren Sie wiederum die Zuverlässigkeit von 50 bis 90 Prozent (`z`). Und für jedes dieser Szenarien lassen Sie schließlich drei Codierende (`c1`, `c2` und `c3`) zufällig `n` Videos mit einer Zuverlässigkeit `z` (= `z` Prozent sind korrekt, der Rest wird mit einer Wahrscheinlichkeit von `z` Prozent geraten) codieren und berechnen deren Krippendorffs Alpha (`alpha`). Dafür können Sie in Python die Funktion `krippendorff.alpha` aus der Bibliothek `krippendorff` nutzen und in R die Funktion `test_icr` aus dem Paket `tidycomm`. Vergessen Sie nicht, in jedem Durchlauf `n`, `z`, `actually_positive` und `alpha` zu protokollieren. Am Ende lassen sich die Ergebnisse mithilfe des untenstehenden Codes visualisieren.

```python
# Python
import random
import pandas as pd
import krippendorff

random.seed(42)

simulation_results = pd.DataFrame()

for i in range(1, 11):
  # hier geht's los ...

# ab hier nurmehr Visualisierung
import matplotlib.pyplot as plt
fig, axes = plt.subplots(nrows=2, ncols=2)

axes[0,0].set_title('<30% unkritisch-positiv')
simulation_results[(simulation_results['actually_positive'] < .3) & (simulation_results['z'] == .5)].plot(x='n', y='alpha', ax=axes[0,0], label='z = .5')
simulation_results[(simulation_results['actually_positive'] < .3) & (simulation_results['z'] == .6)].plot(x='n', y='alpha', ax=axes[0,0], label='z = .6')
simulation_results[(simulation_results['actually_positive'] < .3) & (simulation_results['z'] == .7)].plot(x='n', y='alpha', ax=axes[0,0], label='z = .7')
simulation_results[(simulation_results['actually_positive'] < .3) & (simulation_results['z'] == .8)].plot(x='n', y='alpha', ax=axes[0,0], label='z = .8')

axes[0,1].set_title('30-40% unkritisch-positiv')
simulation_results[(simulation_results['actually_positive'] >= .3) & (simulation_results['actually_positive'] < .4) & (simulation_results['z'] == .5)].plot(x='n', y='alpha', ax=axes[0,1], label='z = .5')
simulation_results[(simulation_results['actually_positive'] >= .3) & (simulation_results['actually_positive'] < .4) & (simulation_results['z'] == .6)].plot(x='n', y='alpha', ax=axes[0,1], label='z = .6')
simulation_results[(simulation_results['actually_positive'] >= .3) & (simulation_results['actually_positive'] < .4) & (simulation_results['z'] == .7)].plot(x='n', y='alpha', ax=axes[0,1], label='z = .7')
simulation_results[(simulation_results['actually_positive'] >= .3) & (simulation_results['actually_positive'] < .4) & (simulation_results['z'] == .8)].plot(x='n', y='alpha', ax=axes[0,1], label='z = .8')

axes[1,0].set_title('40-60% unkritisch-positiv')
simulation_results[(simulation_results['actually_positive'] >= .4) & (simulation_results['actually_positive'] < .6) & (simulation_results['z'] == .5)].plot(x='n', y='alpha', ax=axes[1,0], label='z = .5')
simulation_results[(simulation_results['actually_positive'] >= .4) & (simulation_results['actually_positive'] < .6) & (simulation_results['z'] == .6)].plot(x='n', y='alpha', ax=axes[1,0], label='z = .6')
simulation_results[(simulation_results['actually_positive'] >= .4) & (simulation_results['actually_positive'] < .6) & (simulation_results['z'] == .7)].plot(x='n', y='alpha', ax=axes[1,0], label='z = .7')
simulation_results[(simulation_results['actually_positive'] >= .4) & (simulation_results['actually_positive'] < .6) & (simulation_results['z'] == .8)].plot(x='n', y='alpha', ax=axes[1,0], label='z = .8')

axes[1,1].set_title('>60% unkritisch-positiv')
simulation_results[(simulation_results['actually_positive'] >= .6) & (simulation_results['z'] == .5)].plot(x='n', y='alpha', ax=axes[1,1], label='z = .5')
simulation_results[(simulation_results['actually_positive'] >= .6) & (simulation_results['z'] == .6)].plot(x='n', y='alpha', ax=axes[1,1], label='z = .6')
simulation_results[(simulation_results['actually_positive'] >= .6) & (simulation_results['z'] == .7)].plot(x='n', y='alpha', ax=axes[1,1], label='z = .7')
simulation_results[(simulation_results['actually_positive'] >= .6) & (simulation_results['z'] == .8)].plot(x='n', y='alpha', ax=axes[1,1], label='z = .8')

plt.show()
```

```r
# R
library(tidyverse)

set.seed(42)

simulation_results <- NULL

for (i in 1:10) {
  # hier geht's los ...
}

# ab hier nurmehr Visualisierung
simulation_results %>% 
  mutate(z = sprintf('%.0f%% zuverlässig', 100*z),
         actually_positive = sprintf('%.0f%% unkritisch-positiv', 100*round(actually_positive, 1)),
         actually_positive = factor(actually_positive, levels = paste0(seq(10, 90, 10), '% unkritisch-positiv'))) %>% 
  filter(!is.na(actually_positive)) %>% 
  ggplot(aes(x = n,
             y = alpha,
             color = z,
             fill = z)) +
  geom_smooth(method = 'lm',
              formula = 'y~x') +
  scale_x_continuous('Anzahl gemeinsam codierter Videos [n]',
                     breaks = seq(30, 150, 20)) +
  scale_y_continuous('Krippendorff\'s Alpha',
                     breaks = seq(0, .9, .15)) +
  scale_color_brewer('Zuverlässigkeit', palette = 'Blues') + 
  scale_fill_brewer('Zuverlässigkeit', palette = 'Blues') + 
  facet_wrap(vars(actually_positive)) +
  theme_minimal()
```


### Bootstrapping
Laden Sie den aus früheren Übungen bekannten Datensatz  [erstwaehlende.csv](https://raw.githubusercontent.com/datenfruehstueck/ccs/main/02_Daten-sichten/erstwaehlende.csv). Wir nutzen für das Bootstrapping nur das `alter` daraus. Wenn Sie die Altersdaten als Histogramm visualisieren, dann fällt schnell auf, dass es sich nicht um eine Normalverteilung handelt. Nun hangeln wir uns dem Pseudocode entlang: Erstellen Sie eine leere Variable (`bootstrap_mean`) und generieren Sie in einer Schleife mit 1000 Iterationen jeweils eine Zufallsstichprobe aus den Erstwählenden, die genau so groß ist, wie die Originalstichprobe, aber mit Zurücklegen gezogen wird. Je Zufallsstichprobe berechnen Sie dann den Mittelwert des Alters und ergänzen ihn in der leeren Variable. Nach Abschluss der Schleife können Sie nun diese neue Variable in einem Histogramm darstellen -- und sehen eine annähernde Normalverteilung. So lassen sich daraus zum Abschluss der (kaum veränderte) Mittelwert (und in weiterer Folge auch das Konfidenzintervall) berechnen.


### Agentenbasierte Modellierung
Für ABM weichen wir auf eine externe Software aus. Zwar kann auch der Pseudocode für ABM selbst programmiert werden, gerade die Visualisierung der Zwischenschritte und der Ergebnisse ist aber verhältnismäßig aufwändig. Wir setzen dabei auf [NetLogo](https://ccl.northwestern.edu/netlogo/), die nicht nur eine (effizientere) Version für den Computer zur Installation, sondern auch eine (weniger effiziente) Version für das Web anbieten. Diese [NetLogo-Web-Version](https://www.netlogoweb.org/launch) nutzen wir für unsere Übung. 

Suchen Sie sich aus der Model-Bibliothek ganz oben das `Sample Models/Social Science/Voting`-Modell heraus. Es geht davon aus, dass Menschen ihre Wahlentscheidung ihrem Umfeld anpassen. Ganz vereinfacht gesprochen entspricht das dem Bandwaggon-Effekt. Mit einem Klick auf `Setup` generieren Sie eine zufällige Ausgangslage mit zwei Parteien (blau und grün). Ein Klick auf `go` lässt nun in jedem "Tick" (jedem Zeit-Schritt) jede Person ihre Wahlpräferenz ändern, wenn das Umfeld mehrheitlich der anderen Partei zugeneigt ist. Wie sich bereits nach kurzer Zeit zeigt, fragmentiert das Feld sehr schnell in verhärtete Fronten, das Modell kommt dabei auch sehr schnell zu einem Stopp. 

Ergänzen Sie nun einen Haken bei `award-close-calls-to-loser?` und beginnen nochmals, das Modell zu simulieren. Auch dieses Mal ändern Personen ihre Wahlpräferenz zugunsten der Mehrheitsmeinung -- es sei denn, die Mehrheitsmeinung ist äußerst knapp. In diesem Fall ändern Personen ihre Meinung zugunsten der Minderheitsmeinung. Ganz vereinfacht gesprochen entspricht das dem Underdog-Effekt. Es zeigt sich, dass die Fragmentierung deutlich unschärfer ist und dass das Modell kaum einen Stopppunkt findet. Ständig ändern an den Rändern der fragmentierten Bereiche Personen ihre Meinung.

Alles klar?

Dann schauen Sie sich doch als nächstes das Modell `Sample Models/Networks/Virus on a Network` an. Am unteren Ende der Seite, unter `Model Info`, ist das Modell beschrieben. Anstelle eines "computer networks" können Sie sich das Ganze auch als von einer Pandemie betroffene Gesellschaft vorstellen. Dabei ist gerade der Regler `virus-spread-chance` sehr interessant. Bei den hier möglichen Werten können Sie sich beim [Risk calculator](https://www.mpic.de/4747361/risk-calculator) des Max-Planck-Instituts bedienen -- wenn denn der Regler ausreicht. So gibt das Max-Planck-Institut an, in einem Büro bei Standardeinstellungen eine Ansteckungswahrscheinlichkeit von 5.7 Prozent zu haben, sofern die Beteiligten selbst genesen oder geimpft sind. Im Vergleich dazu steigt die Ansteckungswahrscheinlichkeit auf 19 Prozent unter weder genesen noch geimpften Personen. Simulieren Sie eine Feier laut den Standardeinstellungen des Max-Planck-Instituts. Vergleichen Sie die Ausbreitungsgeschwindigkeit bei Testpflicht und ohne Testpflicht. 



## Lösungsansätze

Ab hier folgen nun verschiedene Lösungswege zu den oben vorgestellten Übungen. Damit Sie die nicht "versehentlich" überscrollen und so Ihrer Übungsmöglichkeiten beraubt werden, folgt hier zunächst ein visueller Bruch.

![Winkende weiße Katze als GIF](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

### Trockenübungen

1. Werden mehrere voneinander unabhängige und reale Größen miteinander kombiniert – also etwa addiert oder ihre Mittelwerte gebildet –, so besagt der zentrale Grenzwertsatz, dass das Ergebnis näherungsweise einer Normalverteilung entspricht. 
1. Das Gesetz der großen Zahlen besagt, dass mit zunehmender Wiederholung von ein und demselben Zufallsexperiment (= mathematische Experimente mit Zufallszahlen) jene Ergebnisse, die eine höhere reale Wahrscheinlichkeit aufweisen, auch häufiger auftreten.
1. Hier einige Auszüge:
   - Strombedarf
   - Kühlungs-/Wasserbedarf
   - Quellen dieser Energieversorgung (fossil vs. erneuerbar)
   - Bedarf nach seltenen Elementen (insbes. Cobalt, Kupfer und Lithium)
   - Energiebedarf bei der Gewinnung reinen Siliziums
   - Arbeitsbedingungen in den Abbaustätten / Minen
   - Grundwasserraub bei der Förderung von insbes. Lithium
1. Auch hier nur einige Auszüge:
   - Monte-Carlo-Simulationen: relativ einfach nachvollziehbar, analytisch scheinbar unlösbare Probleme werden lösbar, schafft Möglichkeit zur Prüfung von benötigten Größen vor eigentlicher Durchführung
   - Bootstrapping: relativ einfach nachvollziehbar, statistisch notwendige Fehlergrößen lassen sich für bislang Fehlergrößen-lose Stichproben berechnen/simulieren
   - Agentenbasierte Modellierung: erlaubt kausale Untersuchungen komplexer sozialer Systeme, ermöglicht Schlüsse von Mikro-Einflüssen auf Makro-Zusammenhänge, erlaubt gewinnbringende Verquickung von explorativer/deskriptiver/explanativer Forschung

### Praxisübungen

#### Monte-Carlo-Simulation

```python
# Python
import random
import pandas as pd
import krippendorff

random.seed(42)

simulation_results = pd.DataFrame()

for i in range(1, 11):
  actually_positive = random.random()
  for n in range(30, 151):
    for z in [ j/10 for j in range(5, 10) ]:
      truth = [ int(random.random() < actually_positive) for j in range(n) ]
      codings = [ 
        [ truth[j] if random.random() < z else int(random.random() < z) for j in range(n) ],
        [ truth[j] if random.random() < z else int(random.random() < z) for j in range(n) ],
        [ truth[j] if random.random() < z else int(random.random() < z) for j in range(n) ]
      ]
      simulation_results = simulation_results.append({ 'n': float(n),
                            'z': z,
                            'actually_positive': actually_positive,
                            'alpha': krippendorff.alpha(codings) },
                          ignore_index = True)


# ab hier nurmehr Visualisierung
import matplotlib.pyplot as plt
fig, axes = plt.subplots(nrows=2, ncols=2)

axes[0,0].set_title('<30% unkritisch-positiv')
simulation_results[(simulation_results['actually_positive'] < .3) & (simulation_results['z'] == .5)].plot(x='n', y='alpha', ax=axes[0,0], label='z = .5')
simulation_results[(simulation_results['actually_positive'] < .3) & (simulation_results['z'] == .6)].plot(x='n', y='alpha', ax=axes[0,0], label='z = .6')
simulation_results[(simulation_results['actually_positive'] < .3) & (simulation_results['z'] == .7)].plot(x='n', y='alpha', ax=axes[0,0], label='z = .7')
simulation_results[(simulation_results['actually_positive'] < .3) & (simulation_results['z'] == .8)].plot(x='n', y='alpha', ax=axes[0,0], label='z = .8')

axes[0,1].set_title('30-40% unkritisch-positiv')
simulation_results[(simulation_results['actually_positive'] >= .3) & (simulation_results['actually_positive'] < .4) & (simulation_results['z'] == .5)].plot(x='n', y='alpha', ax=axes[0,1], label='z = .5')
simulation_results[(simulation_results['actually_positive'] >= .3) & (simulation_results['actually_positive'] < .4) & (simulation_results['z'] == .6)].plot(x='n', y='alpha', ax=axes[0,1], label='z = .6')
simulation_results[(simulation_results['actually_positive'] >= .3) & (simulation_results['actually_positive'] < .4) & (simulation_results['z'] == .7)].plot(x='n', y='alpha', ax=axes[0,1], label='z = .7')
simulation_results[(simulation_results['actually_positive'] >= .3) & (simulation_results['actually_positive'] < .4) & (simulation_results['z'] == .8)].plot(x='n', y='alpha', ax=axes[0,1], label='z = .8')

axes[1,0].set_title('40-60% unkritisch-positiv')
simulation_results[(simulation_results['actually_positive'] >= .4) & (simulation_results['actually_positive'] < .6) & (simulation_results['z'] == .5)].plot(x='n', y='alpha', ax=axes[1,0], label='z = .5')
simulation_results[(simulation_results['actually_positive'] >= .4) & (simulation_results['actually_positive'] < .6) & (simulation_results['z'] == .6)].plot(x='n', y='alpha', ax=axes[1,0], label='z = .6')
simulation_results[(simulation_results['actually_positive'] >= .4) & (simulation_results['actually_positive'] < .6) & (simulation_results['z'] == .7)].plot(x='n', y='alpha', ax=axes[1,0], label='z = .7')
simulation_results[(simulation_results['actually_positive'] >= .4) & (simulation_results['actually_positive'] < .6) & (simulation_results['z'] == .8)].plot(x='n', y='alpha', ax=axes[1,0], label='z = .8')

axes[1,1].set_title('>60% unkritisch-positiv')
simulation_results[(simulation_results['actually_positive'] >= .6) & (simulation_results['z'] == .5)].plot(x='n', y='alpha', ax=axes[1,1], label='z = .5')
simulation_results[(simulation_results['actually_positive'] >= .6) & (simulation_results['z'] == .6)].plot(x='n', y='alpha', ax=axes[1,1], label='z = .6')
simulation_results[(simulation_results['actually_positive'] >= .6) & (simulation_results['z'] == .7)].plot(x='n', y='alpha', ax=axes[1,1], label='z = .7')
simulation_results[(simulation_results['actually_positive'] >= .6) & (simulation_results['z'] == .8)].plot(x='n', y='alpha', ax=axes[1,1], label='z = .8')

plt.show()
```

```r
# R
library(tidyverse)
library(tidycomm)

set.seed(42)

simulation_results <- NULL

for (i in 1:10) {
  actually_positive = runif(1)
  for (n in seq(30, 150, 1)) {
    for (z in seq(.5, .9, .1)) {
      data <- tibble(actually_positive = if_else(runif(n) < actually_positive, 1, 0),
                     c1 = if_else(runif(n) < z, actually_positive, as.numeric(runif(n) < z)),
                     c2 = if_else(runif(n) < z, actually_positive, as.numeric(runif(n) < z)),
                     c3 = if_else(runif(n) < z, actually_positive, as.numeric(runif(n) < z)))
      
      simulation_results <-
        simulation_results %>% 
        bind_rows(tibble(n = n,
                         z = z,
                         actually_positive = actually_positive,
                         alpha = (data %>% 
                                    rownames_to_column(var = 'case_id') %>% 
                                    pivot_longer(c1:c3,
                                                 names_to = 'coder',
                                                 values_to = 'code') %>% 
                                    test_icr(unit_var = case_id,
                                             coder_var = coder,
                                             code,
                                             holsti = F,
                                             agreement = F) %>% 
                                    pull(Krippendorffs_Alpha))))
    }
  }
}

# ab hier nurmehr Visualisierung
simulation_results %>% 
  mutate(z = sprintf('%.0f%% zuverlässig', 100*z),
         actually_positive = sprintf('%.0f%% unkritisch-positiv', 100*round(actually_positive, 1)),
         actually_positive = factor(actually_positive, levels = paste0(seq(10, 90, 10), '% unkritisch-positiv'))) %>% 
  filter(!is.na(actually_positive)) %>% 
  ggplot(aes(x = n,
             y = alpha,
             color = z,
             fill = z)) +
  geom_smooth(method = 'lm',
              formula = 'y~x') +
  scale_x_continuous('Anzahl gemeinsam codierter Videos [n]',
                     breaks = seq(30, 150, 20)) +
  scale_y_continuous('Krippendorff\'s Alpha',
                     breaks = seq(0, .9, .15)) +
  scale_color_brewer('Zuverlässigkeit', palette = 'Blues') + 
  scale_fill_brewer('Zuverlässigkeit', palette = 'Blues') + 
  facet_wrap(vars(actually_positive)) +
  theme_minimal()
```


#### Bootstrapping

```python
# Python
import random
import pandas as pd
import matplotlib.pyplot as plt

random.seed(42)

erstwaehlende = pd.read_csv('erstwaehlende.csv')

plt.figure()
erstwaehlende.hist('alter')
plt.show()
erstwaehlende['alter'].mean()

bootstrap_mean = []
for i in range(1000):
  unterstichprobe = erstwaehlende.sample(n = erstwaehlende['alter'].count(), replace = True)
  bootstrap_mean.append(unterstichprobe['alter'].mean())

plt.figure()
pd.DataFrame(bootstrap_mean).hist()
plt.show()
pd.DataFrame(bootstrap_mean).mean()
```


```r
# R
library(tidyverse)

set.seed(42)

erstwaehlende <- read_csv('erstwaehlende.csv')

erstwaehlende %>% 
  pull(alter) %>% 
  hist()
erstwaehlende %>% 
  pull(alter) %>% 
  mean()

bootstrap_mean <- c()
for (i in 1:1000) {
  unterstichprobe <- 
    erstwaehlende %>% 
    slice_sample(n = nrow(erstwaehlende), replace = TRUE)
  bootstrap_mean <- c(bootstrap_mean, 
                      mean(unterstichprobe$alter))
}

hist(bootstrap_mean)
mean(bootstrap_mean)
```