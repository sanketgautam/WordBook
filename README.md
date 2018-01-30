# WordBook
Pesonalized Cross-Browser Vocabulary Recommender System

![Logo](https://raw.githubusercontent.com/sanketgautam/WordBook/master/wordbook_icon.png)

**WordBook** is a cross-platform, multi-lingual & personalized vocabulary builder, having features to improve vocab learning. It also includes support for finding meaning of connected words/ phrases.

### Deployment Endpoints
The application is Hosted @ [WordBook](http://arvinddhakad.me/hack36/#!/login),
Use the following credentials for testing,
 - **Username:** manit@hack36.com
 - **Password:** hack36

## Vision

 - Browser extension supported on all major browsers & data hosted on cloud
 - It automatically identifies languages of words and categorizes them accordingly
 - Vocab personalization using word categorization into Easy, Medium & Difficult
 - It shows 'Word of the Day' - recommended based on user's personal word collection
 - WordGames - There will be few word games, such as flash cards and vocab quizzes
 - Provides new word recommendation to users based on their previous word categorization
 - Users can browse through their word history and recent words via Web Interface
 - Users can mark saved words as favorite or delete them from their history 

## Why this?
   Traditional Vocabulary Learning Application and Systems are too way generic. They doesn't provide customized learning experience to cater the needs of different users according. We browse internet all the day, read many articles and come around new terminologies & words. We look them up in the dictionary and most of the times we forget them. For people focusing on learning new vocabularies and/or preparing for exams like CAT, GRE etc., require continuous and extensive recitation of vocabulary. 
   Consider an example for better example, we watch lot of movies, we discover unknown words, check their meaning in dictionary. Most of those words repeat somewhere else, and we look-up the dictionary again.
   Also most of the traditional vocabulary builders provide generic and pre-defined approach to learn new words and recite them. While different users have different prior-knowledge levels & learning paces, hence the learning process must be customized to cater the needs of corresponding users.  
   So, to improve the overall experience we introdcuce the "difficuly-concept" (as explained below) and personalize the vocabulary learning experience and help improve the learning curve. 
   
                "__We believe in simplicity of solving a problem while focusing on user-experience__".

## How WordBook Works?

   Vocabulary Learning can be made more efficient with the personalization & tailoring to the User needs. Learning new words requires lot's of constistent practice and suggesting words of difficutly similar to what user has learned can add some cherry on this cake.

   **Hey, but wait a minute ... What is meant by "difficulty" of a word? Have we gone mad or sleep deprived?** 
   
   No, we are fine, atleast for now. Actually difficulty of a word is a context-based concept. Let's consider an example to understand this better, consider two people, Elon & Steve, and
    - Elon feels that words like 'Tesla', 'HyperLoop' & 'Self-Driving Cars' are easy for him as he loves them and deals with them all the time.
    - On the other hands for Steve word 'Tesla' seems difficult to him, while term like "Apple" is easy for him.
    Hence, it's all about perpective and our domains of studies, surroundings and profession. For simplicity we have classified difficulty levels into three domains.
  
   **Okay! I understand that so called "word-difficulty" concept, then what does WordBook is all about?**
   
   WordBook enhances the Vocabulary Learning process by personalizing, reciation features, games, history and lot more. It also provides word recommendation by learning from user history and choice of words.
   
   **Yay, So how exactly does word recommendation will work out?**
   
   Hmm, there are two proposed algorithms for that, which shows the trade-off between simplicity and implementation, 
  - Multiple users marking common words to similar difficulty levels may also have similar treatment for other words in each others' dictionary. Hence, we can recommend them each others words, without them knowing about that (to preserve privacy and anonymity). It's quick and suitable for most of our use-cases. **(easy implementation, works fine for basic use-cases)**

  - An alternative approach will require a bit of Data Analytics & ML Based Recommendation System to make more accurate predictions/ recommendations, but this approach required data-collection, model training & testing. Hence, not feasible for quick prototype. ML Recommendation can take into account various factors such as _domain of study/profession, age, citizenship etc._ **(efficient & provides better recommendations, but takes more time)**

**Seems Okay, So, Is that it?**

Not yet, WordBook provides few other features to make the learning more easier & efficient. Here are few supported features,
 - It maintains a track record of recent words and difficuly levels assigned
 - It prepares customized flash cards & quizzes for the users for words recitation
 - It provides details information on a particular word

**So, what all does WordBook contains? How can I use it?**

It contains a browser-extension, currently support chrome & firefox(partly) and a interactive web-interface for users. 
 - Browser Extension allows users to look-up word/phrase definitions and save them marking their difficulty.
 - Web Interface allows users to go through 'recent words', memorize using 'flash cards', play 'word games' etc.
Browser Extensions is used to put the words into users' pocket/ database. Then, user can use web-interface for recitation, get word recommendations and play 'word games'.

## Screenshots

    This section contains some sample screeshots of the project
<a href="https://raw.githubusercontent.com/sanketgautam/WordBook/master/screenshots/word_popup.png">
    <img src="https://raw.githubusercontent.com/sanketgautam/WordBook/master/screenshots/word_popup.png" width="420">
</a>
<a href="https://raw.githubusercontent.com/sanketgautam/WordBook/master/screenshots/words_database.png">
    <img src="https://raw.githubusercontent.com/sanketgautam/WordBook/master/screenshots/words_database.png" width="420">
</a>
<a href="https://raw.githubusercontent.com/sanketgautam/WordBook/master/screenshots/vocabquiz.png">
    <img src="https://raw.githubusercontent.com/sanketgautam/WordBook/master/screenshots/vocabquiz.png" width="420">
</a>
<a href="https://raw.githubusercontent.com/sanketgautam/WordBook/master/screenshots/flashcard.png">
    <img src="https://raw.githubusercontent.com/sanketgautam/WordBook/master/screenshots/flashcard.png" width="420">
</a>
<a href="https://raw.githubusercontent.com/sanketgautam/WordBook/master/screenshots/flashcard_meaning.png">
    <img src="https://raw.githubusercontent.com/sanketgautam/WordBook/master/screenshots/flashcard_meaning.png" width="420">
</a>
<a href="https://raw.githubusercontent.com/sanketgautam/WordBook/master/screenshots/recent_words.png">
    <img src="https://raw.githubusercontent.com/sanketgautam/WordBook/master/screenshots/recent_words.png" width="420">
</a>
<a href="https://raw.githubusercontent.com/sanketgautam/WordBook/master/screenshots/words_recommendation.png">
    <img src="https://raw.githubusercontent.com/sanketgautam/WordBook/master/screenshots/words_recommendation.png" width="420">
</a>

## What needs to be Improved?
 
 - Compatibility issues must be resolved to make it completely cross-browser
 - Dictionary could be extended to support muliple source & target languages
 - ML Recommendation system can be implemented as explained above 
 - More WordGames can be added to encourage user engagement & learning
 - WordBook can also provide a "New Word", each time when user opens a new tab (like Momentum)
