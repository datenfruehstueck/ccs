---
title: "Texte als Daten II"
chapter: "09"
layout: default
permalink: /09-texte-als-daten-2/
---
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

articles_corpus <- corpus(articles, text_field = 'article')

articles_corpus %>%
  tokens(what = 'word') %>%
  tokens_tolower()
```

Recherchieren und ergänzen Sie die restlichen Schritte:

1. Entfernen von Interpunktion
1. Entfernen von Zahlen
1. Entfernen von URLs
1. Entfernen der acht Stoppwörter `der, die, das, ein, eine, einen, und, oder`
1. Stemming mithilfe von Snowball (in Python über den in nltk inkludierten `SnowballStemmer`, in R über die quanteda-Funktion `tokens_wordstem`)



### Parsing und Tagging

Für das Parsing und Tagging ist eine genaue Kenntnis der Grammatik nötig. Entsprechende Modelle müssen wir deshalb zunächst installieren. Dafür gibt es mehrere zur Auswahl, wir bedienen uns hier der Anschaulichkeit halber gleich zwei verschiedener. Anschließend versuchen wir uns im Parsing und Tagging eines einfachen (und bereits bekannten) Satzes. 

Für Python können wir auf die [spaCy-Bibliothek](https://spacy.io/usage) zurückgreifen. Dafür müssen wir einmalig die Bibliothek (mit `pip`) installieren und das entsprechende Modell `de_core_news_md` herunterladen. 

In R nutzen wir dafür einerseits ein *UDPipe*-Modell, das von Forschenden der Karls-Universität in Tschechien betrieben wird. Nach der Installation des [udpipe-Pakets](https://cran.r-project.org/web/packages/udpipe/) müssen wir einmalig das deutsche Sprachmodell herunterladen, bevor wir das eigentliche Parsing und Tagging durchführen können (das dauert mitunter ein paar Minuten). Außerdem nutzen wir auch mit R das [spaCy(r)-Paket](http://spacyr.quanteda.io/) mit dem Modell `de_core_news_md`, für das unter Windows aber noch zusätzlich [miniconda](https://conda.io/projects/conda/en/latest/user-guide/install/windows.html) installiert werden muss.

```python
# Python

## zunächst Installation über die Kommandozeile
pip install -U pip setuptools wheel
pip install -U spacy
python -m spacy download de_core_news_md

## eigentliches Parsing/Tagging
import spacy

model = spacy.load("de_core_news_md")
text = "Die Klausur, die die Studierenden schreiben, ist anspruchsvoll."

text_annotated = model(text)

for token in text_annotated:
  print(str(token) + ": ")
  print(" - " + token.tag_)
  print(" - " + token.pos_)
```

```r
# R
library(udpipe)
library(spacyr)

## einmalige Installation(en)
udpipe_download_model(language = 'german')

spacy_install()
spacy_download_langmodel('de_core_news_md')
spacy_initialize(model = 'de_core_news_md')


## eigentliches Parsing/Tagging
## (Achtung: Dateiname muss hier ggf. angepasst werden)
udpipe_load_model('german-gsd-ud-2.5-191206.udpipe') %>% 
  udpipe_annotate('Die Klausur, die die Studierenden schreiben, ist anspruchsvoll.') %>% 
  as.data.frame(detailed = T) %>% 
  as_tibble()
  
'Die Klausur, die die Studierenden schreiben, ist anspruchsvoll.' %>%
  corpus() %>%
  spacy_parse(pos = TRUE,
              tag = TRUE,
              lemma = FALSE,
              entity = TRUE,
              nounphrase = TRUE,
              dependency = TRUE) %>%
  as_tibble()
```

1. Parsen / Taggen Sie die ersten zehn Dokumente des 10kGNAD-Datensatzes.
1. Nutzen Sie SpaCy zur Lemmatisierung des ersten Dokuments des 10kGNAD-Datensatzes.


### Named Entity Recognition

Für NER greifen wir ebenfalls auf spaCy zurück und müssen zunächst die entsprechenden Texte erneut "parsen". Einmal geparsed, lassen sich einfach vom Modell erkannte einzelne Entitäten extrahieren. Das gilt sowohl für einzelne Wörter, als auch für zusammengehörige Wörter, die spaCy auch als "Nounphrases" bezeichnet.

```python
# Python
import spacy

model = spacy.load("de_core_news_md")
text = "Die Klausur, die Christian Lindner schreibt, ist anspruchsvoll."

text_annotated = model(text)

## Wörter
for token in text_annotated:
  if token.ent_iob != 2:
    print(str(token) + " is part of an entity")

## Phrasen
for entity in text_annotated.ents:
  print(entity.text + ": " + entity.label_)
```

```r
# R

## Wörter
'Die Klausur, die Christian Lindner schreibt, ist anspruchsvoll.' %>%
  corpus() %>%
  spacy_parse(pos = TRUE,
              tag = TRUE,
              lemma = FALSE,
              entity = TRUE,
              nounphrase = TRUE,
              dependency = TRUE) %>%
  entity_extract(type = 'all') %>%
  as_tibble()

## Phrasen
'Die Klausur, die Christian Lindner schreibt, ist anspruchsvoll.' %>%
  corpus() %>%
  spacy_parse(pos = TRUE,
              tag = TRUE,
              lemma = FALSE,
              entity = TRUE,
              nounphrase = TRUE,
              dependency = TRUE) %>%
  nounphrase_extract() %>%
  as_tibble()
```

1. Extrahieren Sie Entitäten aus den ersten zehn Dokumenten des 10kGNAD-Datensatzes.


### Word Embeddings

Mit spaCy haben wir bereits ein vektorbasiertes Sprachmodell heruntergeladen, das wir jetzt auch für Word Embeddings nutzen können. Die Funktion dafür ist recht einfach, das Ergebnis aber sehr unübersichtlich -- immerhin erhalten wir schlicht dreihundert Zahlenwerte für jeden Begriff zurück.

Mit Python müssen wir dafür auf die verarbeitende Schiene von spaCy wechseln, indem wir den Befehl `pipe` nutzen. Der ist für viele Dokumente ausgelegt, sodass wir nicht einfach unseren Text übergeben können, sondern nur eine Listie von Texten. In unserem Fall eine Liste mit genau einem (unserem!) Text. Anschließend können wir die Vektoren eines jeden Tokens, die hier "Tensor" heißen, ausgeben.

Mit R ist dieser Schritt etwas komplizierter. Denn die Funktion, Vektoren einzeln auszugeben, wurde erst später in die Pakete eingeführt, sodass das R-Paket die entsprechende Funktionalität aktuell nicht standardmäßig beinhaltet. Wir müssen für R also zunächst eine eigene Version für [spaCyr](https://github.com/quanteda/spacyr/tree/issue-171) installieren, um hier einen Einblick zu bekommen. 

```python
# Python

import spacy

model = spacy.load("de_core_news_md")
texts = [ "Die Klausur, die die Studierenden schreiben, ist anspruchsvoll." ]

texts_processed = model.pipe(texts)

for document in texts_processed:
  print(document.tensor)
```

```r
# R

## spaCyr zunächst abschalten, dann neu installieren und schließlich wieder laden
detach('package:spacyr', unload = TRUE)
devtools::install_github('quanteda/spacyr', ref = 'issue-171')
library(spacyr)
spacy_initialize(model = 'de_core_news_md')

'Die Klausur, die die Studierenden schreiben, ist anspruchsvoll.' %>%
  corpus() %>%
  spacy_parse(pos = TRUE,
              tag = TRUE,
              lemma = FALSE,
              entity = TRUE,
              nounphrase = TRUE,
              dependency = TRUE) %>%
  spacy_wordvectors_lookup()
```


### DFMs

Für die Erstellung von Document-Feature-Matrizen greifen wir der Einfachheit halber hier nur auf die pre-processeden Typen zurück. Im Grunde könnten wir eine DFM aber auch aus den gerade extrahierten Nounphrases bauen. Auf Basis dieser DFM können wir dann die Anzahl der Features, die (unveränderte) Anzahl der Dokumente sowie die Sparsity ableiten. 

Während das in R sehr einfach über Hilfsfunktionen möglich ist, brauchen wir in Python ein etwas technischeres Begriffsverständnis. DFMs sind demnach Matrizen, wobei je Dokument (Zeile) ein Vektor aus Häufigkeiten von Tokens vorliegt. Die entsprechenden Funktionen entnehmen wir der [sklearn](https://scikit-learn.org/)-Bibliothek, die wir noch installieren müssen (`pip install scikit-learn`). 

Für den weiteren Verlauf reduzieren wir die DFMs allerdings drastisch, um den Rechenaufwand für die noch ausstehenden Visualisierungen gering zu halten. Deshalb behalten wir nur Wörter, die in mindestens einem Prozent, aber gleichzeitig in weniger als vierzig Prozent aller Dokumente vorkommen.

```python
# Python
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer

articles_csv = pd.read_csv('10kgnad_articles.csv', sep = ';', header = None, names = [ 'ressort', 'article' ], quotechar = "'")
articles = articles_csv["article"]

model_count = CountVectorizer(max_df = 0.40, min_df = 0.01)
articles_counted = model_count.fit_transform(articles)
dfm = pd.DataFrame(articles_counted.toarray(), columns = model_count.get_feature_names_out())

print(model_count.get_feature_names_out().size)
print(articles_counted.size)
print(sum((dfm == 0).astype(int).sum())/dfm.size)
```

```r
# R
articles_dfm <-
  articles_corpus %>%
  tokens(what = 'word') %>%
  tokens_tolower() %>%
  dfm() %>%
  dfm_trim(min_docfreq = .01, 
           max_docfreq = .40, 
		   docfreq_type = 'prop')

nfeat(articles_dfm)
ndoc(articles_dfm)
sparsity(articles_dfm)
```

Um aus DFMs Wortwolken zu berechnen, brauchen wir in Python die separate [wordcloud](https://pypi.org/project/wordcloud/)-Bibliothek zur Visualisierung und müssen zudem die Häufigkeiten selbst berechnen. In R benötigen wir nur ein Paket, das Teil des erweiterten quanteda-Universums ist. Ist [quanteda.textplots](https://cran.r-project.org/web/packages/quanteda.textplots/) einmal installiert, ist die Handhabung für die die Erstellung von Wortwolken mit R ein Kinderspiel.

```python
# Python
from wordcloud import WordCloud
import matplotlib.pyplot as plt

dfm_dict = dict(zip(model_count.get_feature_names_out(), articles_counted.sum(axis = 0).tolist()[0]))
cloud = WordCloud().generate_from_frequencies(dfm_dict)
plt.imshow(cloud)
plt.axis("off")
```

```r
# R
articles_dfm %>%
  textplot_wordcloud(maxwords = 100)
```

1. Erstellen Sie eine Wortwolke, die sich lediglich aus dem Ressort Wissenschaft speist.
1. Nutzen Sie Ihren ordentlich pre-processeden Korpus, um damit eine saubere(re) Wortwolke zu erstellen.


## Lösungsansätze

Ab hier folgen nun verschiedene Lösungswege zu den oben vorgestellten Übungen. Damit Sie die nicht "versehentlich" überscrollen und so Ihrer Übungsmöglichkeiten beraubt werden, folgt hier zunächst ein visueller Bruch.

![Winkende weiße Katze als GIF](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

### Trockenübungen

1. Allzu häufig vorkommende Begriffe in Korpora, die für Analysen in der Regel mehr Rauschen als inhaltlichen Mehrwert versprechen.
1. Das Stemming reduziert regelbasiert Wörter auf ihren Wortstamm, die Lemmatisierung führt Wörter inhaltlich auf ihre Nennform zurück.
1. Mindestens die eventuelle Überführung in Kleinschreibung, die Entfernung von Interpunktion und Zahlen, das Entfernen von Stoppwörtern, das Stemming oder die Lemmatisierung. 
1. Eine Matrix mit Types als Spalten und Dokumenten als Zeilen, wobei die Zellen in der Urform mit absoluten Vorkommnissen gefüllt sind.


### Praxisübungen

#### Pre-Processing

```python
# Python
import string
import re
from nltk.stem.snowball import GermanStemmer

punctuation = string.punctuation
stopwords = ['der', 'die', 'das', 'ein', 'eine', 'einen', 'und', 'oder']
stemmer = GermanStemmer()

for i in range(len(articles['article'])):
  # remove numbers with regular expression
  article_without_numbers = re.sub('\d+', '', articles['article'][i])
  
  # remove URLs with regular expression
  article_without_urls = re.sub('http\S+', '', article_without_numbers)
  
  # tokenize
  article_tokens = word_tokenize(article_without_urls, language='german')
  
  # remove punctuation/stopwords from token list
  tokens_without_punctuation = [ token for token in article_tokens if token not in punctuation ]
  tokens_without_stopwords = [ token for token in tokens_without_punctuation if token not in stopwords ]
  
  # stem
  tokens_stemmed = tokens_without_stopwords.apply(stemmer.stem)
  
  # use final list
  articles['tokens_unigram'][i] = tokens_stemmed
```

```r
# R
articles_corpus %>%
  tokens(what = 'word',
         remove_punct = TRUE,
		 remove_numbers = TRUE,
		 remove_url = TRUE) %>%
  tokens_tolower() %>%
  tokens_remove(pattern = c('der', 'die', 'das', 'ein', 'eine', 'einen', 'und', 'oder')) %>%
  tokens_wordstem('german')
```


#### Parsing / Tagging

```python
# Python
import spacy
import pandas as pd

model = spacy.load("de_core_news_md")
articles = pd.read_csv('10kgnad_articles.csv', sep = ';', header = None, names = [ 'ressort', 'article' ], quotechar = "'").loc[1:10]

for article in articles['article']:
  article_annotated = model(article)
  for token in article_annotated:
    print(str(token) + ": ")
    print(" - " + token.tag_)
    print(" - " + token.pos_)
    print(" - " + token.lemma_)
```

```r
# R
udpipe_load_model('german-gsd-ud-2.5-191206.udpipe') %>% 
  udpipe_annotate(articles_corpus %>%
                    head(n = 10)) %>% 
  as.data.frame(detailed = T) %>% 
  as_tibble()
  
articles_corpus %>%
  head(n = 10) %>%
  spacy_parse(lemma = TRUE) %>%
  as_tibble()
```


#### Named Entity Recognition

```python
# Python
import spacy
import pandas as pd

model = spacy.load("de_core_news_md")
articles = pd.read_csv('10kgnad_articles.csv', sep = ';', header = None, names = [ 'ressort', 'article' ], quotechar = "'").loc[1:10]

text_annotated = model(text)

for entity in text_annotated.ents:
  print(entity.text + ": " + entity.label_)
```

```r
# R
articles_tokens %>%
  head(n = 10) %>%
  spacy_parse(pos = TRUE,
              tag = TRUE,
              lemma = FALSE,
              entity = TRUE,
              nounphrase = TRUE,
              dependency = TRUE) %>%
  entity_extract(type = 'all') %>%
  as_tibble()
```


#### DFMs

```python
# Python
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import string
import re
from nltk.stem.snowball import GermanStemmer

articles_csv = pd.read_csv('10kgnad_articles.csv', sep = ';', header = None, names = [ 'ressort', 'article' ], quotechar = "'")
articles_csv = articles_csv.loc[articles['ressort'].str.contains('Wissenschaft')]
articles = articles_csv["article"]

model_count = CountVectorizer(max_df = 0.40, min_df = 0.01)
articles_counted = model_count.fit_transform(articles)

dfm_dict = dict(zip(model_count.get_feature_names_out(), articles_counted.sum(axis = 0).tolist()[0]))
cloud = WordCloud().generate_from_frequencies(dfm_dict)
plt.imshow(cloud)
plt.axis("off")


punctuation = string.punctuation
stopwords = ['der', 'die', 'das', 'ein', 'eine', 'einen', 'und', 'oder']
stemmer = GermanStemmer()

for i in range(len(articles_csv['article'])):
  # remove numbers with regular expression
  article_without_numbers = re.sub('\d+', '', articles_csv['article'][i])
  
  # remove URLs with regular expression
  article_without_urls = re.sub('http\S+', '', article_without_numbers)
  
  # tokenize
  article_tokens = word_tokenize(article_without_urls, language='german')
  
  # remove punctuation/stopwords from token list
  tokens_without_punctuation = [ token for token in article_tokens if token not in punctuation ]
  tokens_without_stopwords = [ token for token in tokens_without_punctuation if token not in stopwords ]
  
  # stem
  tokens_stemmed = tokens_without_stopwords.apply(stemmer.stem)
  
  # use final list
  articles_csv['tokens_unigram'][i] = tokens_stemmed

model_count = CountVectorizer(max_df = 0.40, min_df = 0.01)
articles_counted = model_count.fit_transform(articles_csv["tokens_unigram"])
dfm = pd.DataFrame(articles_counted.toarray(), columns = model_count.get_feature_names_out())

dfm_dict = dict(zip(model_count.get_feature_names_out(), articles_counted.sum(axis = 0).tolist()[0]))
cloud = WordCloud().generate_from_frequencies(dfm_dict)
plt.imshow(cloud)
plt.axis("off")
```

```r
# R
articles_dfm %>%
  dfm_subset(ressort == 'Wissenschaft') %>%
  textplot_wordcloud(maxwords = 100)

articles_corpus %>%
  tokens(what = 'word',
         remove_punct = TRUE,
		 remove_numbers = TRUE,
		 remove_url = TRUE) %>%
  tokens_tolower() %>%
  tokens_remove(pattern = c('der', 'die', 'das', 'ein', 'eine', 'einen', 'und', 'oder')) %>%
  tokens_wordstem('german') %>%
  dfm() %>%
  dfm_trim(min_docfreq = .01, 
           max_docfreq = .40, 
		   docfreq_type = 'prop') %>%
  dfm_subset(ressort == 'Wissenschaft') %>%
  textplot_wordcloud(maxwords = 100)
```
