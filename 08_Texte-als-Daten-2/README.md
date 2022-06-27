# Texte als Daten II

## Trockenübungen

1. Was sind Stoppwörter?
1. Beschreiben Sie den Unterschied zwischen Lemmatisierung und Stemming.
1. Welche Schritte gehören üblicherweise zum Pre-Processing?
1. Was ist eine DFM?


## Praxisübungen

Wir laden wieder den [Ten Thousand German News Articles Dataset](https://github.com/tblock/10kGNAD), den wir auch schon im vorherigen Abschnitt genutzt haben. Laden Sie sich [den Datensatz](https://github.com/datenfruehstueck/ccs/blob/main/08_Texte-als-Daten-1/10kgnad_articles.csv) auf Ihren Computer herunter und achten Sie beim Ausführen des Codes auf passende Pfade. Der Code zum Laden der Artikel in eine Variable (`articles`) ist wiederum vorgegeben.

```python
# Python
import pandas as pd

articles = pd.read_csv('10kgnad_articles.csv', sep = ';', header = None, names = [ 'ressort', 'article' ], quotechar = "'")
```

```r
# R
library(tidyverse)

articles <- read_csv2('10kgnad_articles.csv', col_names = c('ressort', 'article'), quote = "'", col_types = 'cc')
```


### Pre-Processing

Nun arbeiten wir uns schrittweise durch das Pre-Processing, das in den meisten Fällen einfach nur das Ändern eines Parameters umfasst. Wir beginnen mit der Überführung in Kleinschreibung.

```python
# Python

## einmalige Installation (wenn nicht schon im letzten Kapitel geschehen)
import nltk
nltk.download('punkt')

## eigentliche Tokenisierung
from nltk.tokenize import word_tokenize
articles['tokens_unigram'] = articles['article'].apply(word_tokenize, language='german')
```

```r
# R
library(quanteda)

corpus <- corpus(articles, text_field = 'article')

corpus %>%
  tokens(what = 'word') %>%
  tokens_tolower()
```

Recherchieren und ergänzen Sie die restlichen Schritte:

1. Entfernen von Interpunktion
1. Entfernen von Zahlen
1. Entfernen von Hashtags
1. Entfernen von URLs
1. Entfernen der acht Stoppwörter `der, die, das, ein, eine, einen, und, oder`
1. Stemming mithilfe von Snowball (in Python über den in nltk inkludierten `SnowballStemmer`, in R über die quanteda-Funktion `tokens_wordstem`)


### Parsing und Tagging

### Named Entity Recognition

### Word Embeddings

### DFMs

keyness
wordcloud


## Lösungsansätze

Ab hier folgen nun verschiedene Lösungswege zu den oben vorgestellten Übungen. Damit Sie die nicht "versehentlich" überscrollen und so Ihrer Übungsmöglichkeiten beraubt werden, folgt hier zunächst ein visueller Bruch.

![Winkende weiße Katze als GIF](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

### Trockenübungen

1. 


### Praxisübungen

#### Pre-Processing
