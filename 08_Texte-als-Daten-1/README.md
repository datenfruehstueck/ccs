---
title: "Texte als Daten I"
chapter: "08"
layout: default
permalink: /08-texte-als-daten-1/
---

## Trockenübungen

1. Erklären Sie das Konzept der Tokenisierung.
1. Wozu dient die Unterscheidung in Types und Tokens?
1. Was ist der Unterschied zwischen Uni-, Bi-, Tri- und N-Grammen?
1. Können Sie den regulären Ausdruck `[Pp]rüfung(srelevant)?` entschlüsseln?
1. Nennen Sie Anwendungsfelder, für dich sich Diktionäre eignen.
1. Beschreiben Sie die grobe Funktionsweise von "word2vec" oder "GloVe".

## Praxisübungen

Laden wir zunächst einen Korpus. Dazu können Sie sich des frei vergübaren [Ten Thousand German News Articles Dataset](https://github.com/tblock/10kGNAD) bedienen. Es enthält, nun ja, zehntausend Artikel der österreichischen Tageszeitung [Der Standard](https://www.derstandard.at/). Laden Sie sich den Datensatz auf Ihren Computer herunter und achten Sie beim Ausführen des Codes auf passende Pfade. Der Code zum Laden der Artikel in eine Variable (`articles`) ist hier vorgegeben. Jeder Artikel besteht dabei aus einem Ressort, dem er entstammt, und dem eigentlichen Text. Und längst wissen wir, wie wir die genaue Zahl der in einem solchen DataFrame (oder Tibble) enthaltenen Zeilen (hier also Artikel) ermitteln können. 

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

1. Wie viele Artikel sind im Datensatz (Spoiler: Es sind nicht ganz genau 10k).
1. Welche Ressorts sind im Datensatz enthalten?
1. Wie viele Artikel entfallen auf jedes Ressort?


### Volltextsuche und reguläre Ausdrücke

Ganz brachial nach Volltexten zu suchen, funktioniert in Python über die [contains-pandas-Funktion](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.str.contains.html) und in R über die [str_detect-tidyverse-Funktion](https://stringr.tidyverse.org/reference/str_detect.html). Beiden übergeben Sie die Spalte des Dataframes, die durchsucht werden soll (bei uns: `article`) und den Suchbegriff.

```python
# Python
articles.loc[articles['article'].str.contains('suchbegriff')]
```

```r
# R
articles %>%
  filter(str_detect(article, 'suchbegriff'))
```

Um reguläre Ausdrücke zu suchen, können Sie schlicht dieselbe Funktion nutzen und einfach den regulären Ausdruck direkt übernehmen. 

```python
# Python
articles.loc[articles['article'].str.contains('[Ss]uchbegriff')]
```

```r
# R
articles %>%
  filter(str_detect(article, '[Ss]uchbegriff'))
```

1. Suchen Sie nach Artikeln, in denen `Sebastian Kurz` vorkommt. Wie viele Artikel finden Sie?
1. Basteln Sie einen regulären Ausdruck für die Suche nach Katzen und Kätzchen.
1. Wenden Sie Ihren regulären Ausdruck auf die Suche an. Wie viele Artikel finden Sie?
1. In welchen Ressorts taucht Sebastian Kurz eher auf und in welchen eher die Katzen/Kätzchen?



### Tokenisierung

Nun wollen wir die Artikeltexte tokenisieren und überführen sie zunächst schlicht in Unigramme. Dafür können wir auf die sehr umfangreichen und frei verfügbaren Pakete [nltk](https://www.nltk.org/) in Python bzw. [quanteda](https://quanteda.io/) in R zurückgreifen. Die Pakete funktionieren unterschiedlich. R fokussiert auf Formalia und ist entsprechend einfach in der Handhabung, benötigt aber zunächst ein sogenanntes "Corpus"-Objekt. Python hingegen kann direkt mit dem Dataframe arbeiten, braucht aber sprachspezifische Informationen, die zunächst heruntergeladen und entsprechend konfiguriert werden müssen. Außerdem geben die Funktionen etwas unterschiedliche Werte zurück: Während die [nltk-tokenize-Funktionen](https://www.nltk.org/api/nltk.tokenize.html#module-nltk.tokenize) einzelne Texte als Token-Arrays zurückgeben, die wir zum Beispiel wieder an den ursprünglichen DataFrame anhängen können, retournieren die [quanteda-tokens-Funktionen](https://quanteda.io/reference/index.html#section-tokens-functions) ein eigenes Objekt, das wir separat weiterverarbeiten. Das Ergebnis sieht indes bei beiden (nahezu) gleich aus. 

```python
# Python

## zunächst Installation der Konfiguration
import nltk
nltk.download('punkt')

## eigentliche Tokenisierung
from nltk.tokenize import word_tokenize
articles['tokens_unigram'] = articles['article'].apply(word_tokenize, language='german')

articles.head(2)
```

```r
# R
library(quanteda)

articles_corpus <- corpus(articles, text_field = 'article')
articles_tokens <- tokens(articles_corpus, what = 'word')

articles_tokens %>%
  head(n = 2)
```

1. Tokenisieren Sie in Sätze.
1. Zählen Sie die Satz-Tokens, die Satz-Types und berechnen Sie die Satz-TTR.
1. Wiederholen Sie dasselbe für Unigramm-Tokens. Wie unterscheiden sich die beiden TTR voneinander (und warum)?



### Diktionäre

Wenn wir uns Diktionären / Lexika zuwenden, dann gibt es einerseits die Möglichkeit, selbst eine Liste an Wörtern als Diktionär anzulegen und damit zu arbeiten, oder andererseits auf veröffentliche Diktionäre zurückzugreifen, die entsprechend validiert sind. Für den Moment wenden wir uns einem bekannten [Sentiment-Diktionär von Christian Rauh](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/BKBXWD) zu. Er hat darin viele (viele!) Wörter mit Werten versehen, die angeben, ob ein Wort eher positiv (`+1`) oder eher negativ (`-1`) emotional aufgeladen ist. Das Wort "fürchterlich" beispielsweise weist einen negativen Wert auf, während das Wort "Frühlingsgefühl" wohl eher positiv konnotiert ist. Für diese Übung wurde das Diktionär in ein einfaches CSV-Format überführt und kann direkt heruntergeladen und im Skript geladen werden. 

Anschließend unterscheiden sich Python und R allerdings. In Python können wir nun Wörter in den Dokumenten in einer Schleife durchlaufen und jeweils nachschauen, ob sie im Diktionär hinterlegt sind. Wenn ja, nehmen wir den entsprechenden Wert (`+1` oder `-1`) mit auf und summieren am Ende alle gefundenen Begriffe eines Dokuments in einen Dokument-Score (sodass sich beispielsweise ein negativ und ein positiv aufgeladenes Wort zu einem neutralen Sentiment zusammenfügen). Mit R ist das etwas einfacher: Hier können wir mit der [quanteda-dictionary-Funktion](https://quanteda.io/reference/dictionary.html) aus der Liste an Wörtern ein Diktionär generieren, das wir dann schlicht auf unsere Tokens anwenden. Die Schleifen und Rechenvorgänge übernimmt dabei das quanteda-Paket für uns und übergibt uns am Ende ein Objekt, in dem nurmehr die Begriffe "positiv" und "negativ" als Dokument-Inhalte übrig bleiben -- so oft sie eben entsprechende Wörter im Original-Dokument ersetzen können. Anschließend müssen wir nur noch das etwas unhandliche Datenformat auflösen, mit den ursprünglichen Textinformationen (Ressorts) zusammenbringen und die "positiv"- und "negativ"-Wörter je Dokument in einen Sentiment-Score umwandeln.

In folgendem Beispiel laden wir also das Diktionär von Rauh und wenden es auf unsere Dokumente an. Das dauert in R aufgrund seiner Stapelverarbeitung nicht sonderlich lange, in Python schon deutlich länger.

 ```python
# Python
rauh_words = pd.read_csv('rauh_sentiment_dict.csv', sep = ',')
rauh_dict_positiv = list(rauh_words.loc[rauh_words['sentiment'] == 1].feature.str.strip())
rauh_dict_negativ = list(rauh_words.loc[rauh_words['sentiment'] == -1].feature.str.strip())

articles['tokens_unigram'] = articles['article'].apply(word_tokenize, language='german')

articles['sentiment_positiv'] = articles['article'].apply(lambda a: sum([1 if word in a else 0 for word in rauh_dict_positiv]))
articles['sentiment_negativ'] = articles['article'].apply(lambda a: sum([1 if word in a else 0 for word in rauh_dict_negativ]))
articles['sentiment'] = articles['sentiment_positiv'] - articles['sentiment_negativ']
```

```r
# R
rauh_words <- read_csv('rauh_sentiment_dict.csv')
rauh_dict <- dictionary(list(positiv = (rauh_words %>% 
                                          filter(sentiment == '1') %>% 
                                          distinct(feature) %>% 
                                          pull(feature)),
                             negativ = (rauh_words %>% 
                                          filter(sentiment == '-1') %>% 
                                          distinct(feature) %>% 
                                          pull(feature))))

articles_corpus <- 
  articles %>% 
  corpus(text_field = 'article')

articles_tokens <- 
  articles_corpus %>%
  tokens(what = 'word')

articles <- 
  articles_tokens %>%
  tokens_lookup(dictionary = rauh_dict) %>%
  dfm() %>% 
  convert(to = 'data.frame') %>% 
  as_tibble() %>% 
  bind_cols(articles) %>% 
  mutate(sentiment = positiv - negativ)
```

1. Vergleichen Sie die durchschnittlichen Sentiment-Scores über die Ressorts hinweg.
1. Basteln Sie sich ein neues Diktionär, das die Thematisierung der deutschen Kanzlerschaft (zum Zeitpunkt der Texte: Merkel) inzufangen imstande ist. Welche Begriffe machen in diesem Diktionär Sinn?
1. Wenden Sie Ihr Kanzlerschafts-Diktionär auf die Texte an und zählen Sie, wieviele Texte die deutsche Kanzlerschaft Ihrer Operationalisierung zufolge thematisieren.
1. Zählen Sie die Anteil der Texte je Ressort aus, die die deutsche Kanzlerschaft thematisieren. Welche Ressorts stechen hier hervor?



### Kollokationsmatrizen

Kollokationsmatrizen werden auch "feature co-occurrence matrices" oder kurz *FCM* genannt. Es gibt über die in den Unterlagen vorgestellten Verfahren hinausgehende Möglichkeiten, Ko-Vorkommnisse zwischen Begriffen ("features") zu berechnen. Um das Beispiel-System aus den Unterlagen aber nachvollziehen zu können, setzen wir auf die angesprochenen fünf Begriffe vor/nach einem Suchbegriff und eine Gewichtung zu dieser Distanz. Damit der Computer nicht überfordert ist, erstellen wir diese Kollokationsmatrix aber nur für die ersten zehn Dokumente.

Erneut können wir in R auf eine fertige Funktion aus dem quanteda-Paket zurückgreifen, müssen uns aber mit einigem Drumherum rumschlagen, während wir in Python mithilfe von nltk und pandas alles selbst bauen müssen.

```python
# Python
articles_sample = articles.head(10)
unigram_tokens_sample = [ token for token_list in articles_sample['tokens_unigram'].tolist() for token in token_list ]
unigram_types_sample = list(set(unigram_tokens_sample))

fcm = pd.DataFrame(columns=unigram_types_sample)
for single_type in unigram_types_sample:
    fcm.loc[len(fcm)] = 0

for article_index in range(0, len(articles_sample)):
    article_tokens = articles_sample.loc[article_index, 'tokens_unigram']
    for current_token_position in range(0, len(article_tokens)):
        current_token = article_tokens[current_token_position]
        for position_window in range(1, 6):
            if current_token_position + position_window < len(article_tokens):
                current_comparing_token = article_tokens[current_token_position + position_window]
                fcm.loc[unigram_types_sample.index(current_token), current_comparing_token] += 1/position_window
            if current_token_position - position_window >= 0:
                current_comparing_token = article_tokens[current_token_position - position_window]
                fcm.loc[unigram_types_sample.index(current_token), current_comparing_token] += 1/position_window

print(fcm)
```

```r
# R
articles %>%
  slice_head(n = 10) %>% 
  corpus(text_field = 'article') %>% 
  tokens(what = 'word') %>% 
  fcm(context = 'window',
      window = 5,
      count = 'weighted',
      weights = 1/1:5) %>% 
  convert(to = 'data.frame') %>% 
  as_tibble()
```

1. Generieren Sie eine Kollokationsmatrix für den Text `Die Klausur, die die Studierenden schreiben, ist anspruchsvoll.`.


## Lösungsansätze

Ab hier folgen nun verschiedene Lösungswege zu den oben vorgestellten Übungen. Damit Sie die nicht "versehentlich" überscrollen und so Ihrer Übungsmöglichkeiten beraubt werden, folgt hier zunächst ein visueller Bruch.

![Winkende weiße Katze als GIF](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

### Trockenübungen

1. Aufteilung eines Korpus in Uni-/Bi-/Tri-/N-Gramme anhand definierter (u.a. sprachabhängiger) Regeln.
1. Um von Tokens (siehe 1.) zu zählbaren Kategorien zu gelangen, die wiederum effizientere Alternative zu Volltextsuche darstellt.
1. Tokenisierung in einzelne Wörter ("Prüfung"), Zwei-Wort-Paare ("Vereinigte Staaten"), Drei-Wort-Gruppen ("Vereinigte Arabische Emirate") oder, genuiner bezeichnet, Gruppen aus *n* Wörtern.
1. Trifft auf "Prüfung", "prüfung", "Prüfungsrelevant" und "prüfungsrelevant" zu, da am Anfang "P" oder "p" stehen muss und am Ende "srelevant" stehen kann.
1. Einfache Sentimentanalysen, geografische oder thematische Bezüge, Zuordnung zu bestimmten Sprachstilen (z.B. populistisch) ...
1. Siehe Unterlagen zu Kollokationen.


### Praxisübungen

```python
# Python
import pandas as pd

articles = pd.read_csv('10kgnad_articles.csv', sep = ';', header = None, names = [ 'ressort', 'article' ], quotechar = "'")

articles.count()
articles.groupby(['ressort']).size()
```

```r
# R
library(tidyverse)

articles <- read_csv2('10kgnad_articles.csv', col_names = c('ressort', 'article'), quote = "'", col_types = 'cc')

articles %>% 
  count()

articles %>% 
  count(ressort)
```


#### Volltextsuche und reguläre Ausdrücke

```python
# Python
articles.loc[articles['article'].str.contains('Sebastian Kurz')]
articles.loc[articles['article'].str.contains('K[aä]tz(ch)?en')]

articles.loc[articles['article'].str.contains('Sebastian Kurz')].groupby(['ressort']).size()
articles.loc[articles['article'].str.contains('K[aä]tz(ch)?en')].groupby(['ressort']).size()
```

```r
# R
articles %>%
  filter(str_detect(article, 'Sebastian Kurz'))
  
articles %>%
  filter(str_detect(article, 'K[aä]tz(ch)?en'))
  
articles %>%
  filter(str_detect(article, 'Sebastian Kurz')) %>%
  count(ressort)
  
articles %>%
  filter(str_detect(article, 'K[aä]tz(ch)?en')) %>%
  count(ressort)
  
```


### Tokenisierung

```python
# Python
from nltk.tokenize import sent_tokenize
articles['tokens_sentence'] = articles['article'].apply(sent_tokenize, language='german')

sentence_tokens = [ token for token_list in articles['tokens_sentence'].tolist() for token in token_list ]
sentence_types = list(set(sentence_tokens))
len(sentence_tokens)
len(sentence_types)
len(sentence_types)/len(sentence_tokens)

unigram_tokens = [ token for token_list in articles['tokens_unigram'].tolist() for token in token_list ]
unigram_types = list(set(unigram_tokens))
len(unigram_tokens)
len(unigram_types)
len(unigram_types)/len(unigram_tokens)
```

```r
# R
sentence_tokens <- tokens(articles_corpus, what = 'sentence')
sentence_types <- types(sentence_tokens)
length(sentence_tokens)
length(sentence_types)
length(sentence_types)/length(sentence_tokens)

unigram_tokens <- tokens(articles_corpus, what = 'word')
unigram_types <- types(unigram_tokens)
length(unigram_tokens)
length(unigram_types)
length(unigram_types)/length(unigram_tokens)
```


### Diktionäre

```python
# Python
articles[['ressort', 'sentiment']].groupby('ressort').agg({'sentiment': 'mean'})

dict_kanzlerschaft = ['Merkel', 'Kanzlerin', 'Bundeskanzlerin', 'Regierungschefin']
articles['kanzlerschaft'] = articles['article'].apply(lambda a: sum([1 if word in a else 0 for word in dict_kanzlerschaft]))
articles.loc[articles['kanzlerschaft'] > 0].count()
articles.loc[articles['kanzlerschaft'] > 0].groupby(['ressort']).size()
```

```r
# R
articles %>%
  group_by(ressort) %>%
  summarise(mean_sentiment = mean(sentiment))

dict_kanzlerschaft <- dictionary(list(kanzlerschaft = c('Merkel', 'Kanzlerin', 'Bundeskanzlerin', 'Regierungschefin')))

articles_kanzlerschaft <- 
  unigram_tokens %>% 
  tokens_lookup(dictionary = dict_kanzlerschaft) %>%
  dfm() %>% 
  convert(to = 'data.frame') %>% 
  as_tibble() %>% 
  bind_cols(articles)
  
articles_kanzlerschaft %>% 
  filter(kanzlerschaft > 0) %>% 
  count()

articles_kanzlerschaft %>% 
  filter(kanzlerschaft > 0) %>% 
  count(ressort)
```



### Kollokationsmatrizen

```python
# Python
tokens = [ 'die', 'klausur', ',', 'die', 'die', 'studierenden', 'schreiben', ',', 'ist', 'anspruchsvoll', '.' ]
types = list(set(tokens))

fcm = pd.DataFrame(columns=types)
for single_type in types:
    fcm.loc[len(fcm)] = 0

for current_token_position in range(0, len(tokens)):
	current_token = tokens[current_token_position]
	for position_window in range(1, 6):
		if current_token_position + position_window < len(tokens):
			current_comparing_token = tokens[current_token_position + position_window]
			fcm.loc[types.index(current_token), current_comparing_token] += 1/position_window
		if current_token_position - position_window >= 0:
			current_comparing_token = tokens[current_token_position - position_window]
			fcm.loc[types.index(current_token), current_comparing_token] += 1/position_window

print(fcm)
```

```r
# R
'Die Klausur, die die Studierenden schreiben, ist anspruchsvoll.' %>% 
  tokens() %>%
  tokens_tolower() %>% 
  fcm(context = 'window',
      window = 5,
      count = 'weighted',
      weights = 1/1:5) %>% 
  convert(to = 'data.frame') %>% 
  as_tibble()
```