<!DOCTYPE html>
<html>
<body>

<h2>Placeholder page</h2>

<p>This is a placeholder page containing the Javascript functions 
requested to run on the Wikipedia page https://en.wikipedia.org/wiki/Programming_language.

</p>

</body>
</html> 
<script>
	
/*
 * I am aware that my code may be considered in efficient in terms of Time and Space Complexity.  
 * I wanted to store the top25 words in a min-heap so that the space complexity would be O(n) and the time complexity would only be O(n log n).  
 * However, I did not believe that I would have enough time to reliably and safely implement a min-heap effectively 
 * in Javascript with the time provided for this assignment and had to utilize the easy to implement but inefficient key-map array to submit by the deadline.

 * Because this algorithm was split into two parts, I have made a separate function for the first part to read the Wikipedia page.  
 * To test the code for the first portion of the test, use the function countPage() in Google chrome's console.  
 * This will prompt the function to use the page's text contents as input for counting all words.

 * For the second part, the command replaceCommonText(input) can be used as specified in the instructions.  
 * Input can be any string where the function, replaceCommonText(), 
 * would count the top most commonly used words not found in the JSON file.
*/
	
	/* 
	 * Fetches the JSON file of the 1000 most common words for use as a reference of what words to check for and count
	 * Function must be converted into async using await functions in order to allow to fetch data and return the contents of the Promise
	*/
	async function fetchJSON()
	{
		let url = 'https://gist.githubusercontent.com/Thessiah/fb969b429b4d6173916628c7d92bf6e4/raw/fb30bf33cbade43fd667c45437d4937b53ce868a/top1k.json';
		let data = await fetch(url);
        data = await data.json();
		
		return data;
	}

	//Had to be renamed due to function overloading not being supported in Javascript
	function countPage()
	{
		console.log("Using the web page as the string input");
		countAll(document.body.innerText);
	}
	
	/* Checks through the entire page and counts the # of occurrences found based on words found in the JSON file, if any */
	async function countAll(allText)
	{
		var WordList = await fetchJSON();
		allText = allText.replace( /\n/g, " " )						//Removes newlines and tabs
		allText = allText.replace( /\t/g, " " )						//Removes newlines and tabs
		allText = allText.replace(/[^a-zA-Z ]/g,"");				//Keeps only alphabetical characters
		//allText = allText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"]/g," ")
		//allText = allText.replace(/[^a-zA-Z]+/g, ' ');			//Remove anything that isn't a word
		//allText = allText.replace(/ [a-z] /gi, " ")				//Removes single characters
		allText = allText.split(" ");								//Split the string into an array
		
		
		//Filters out all empty values, letters, and all values found in the top 1000 words
		allText = allText.filter(item => (item) && !WordList.includes(item.toLowerCase()) && item.length > 1);
		var key_map = new Map();
		
		while(allText.length)	//While there are still objects in the array
		{
			var word = allText.shift().toLowerCase();	//Take the first word in the array and lowercase it for consistency. 
		
			if(!key_map.has(word))	//If the word isn't found in the key-map, add it to the key-map
				key_map.set(word, 1);
			
			else					//Otherwise, update the key-map with an incremented counter
				key_map.set(word, key_map.get(word) + 1);
		}
		
		/*
		 * Reverses the key-map from most common to least common then removes all elements after the 25th element
		 * THIS WAS A WILLING DECISION TO SACRIFICE MEMORY COMPLEXITY IN EXCHANGE FOR TIME COMPLEXITY.
		 * COMPARED TO THE SCRAPPED METHOD, THIS METHOD HAS TO SORT THE ARRAY ONLY ONCE
		 * THE DOWNSIDE IS THAT THIS WILL HAVE A SPACE COMPLEXITY OF O(N^2)
		 * AGAIN, THIS COULD BE FIXED BY IMPLEMENTING A MIN HEAP FOR A TIME COMPLEXITY OF O(N LOG N) AND A SPACE COMPLEXITY OF O(N) BUT
		 * THERE WASN'T ENOUGH TIME TO RELIABLY AND SAFELY IMPLEMENT A MIN-HEAP
		*/
		
		key_map = new Map([...key_map.entries()].sort((a, b) => b[1] - a[1]));		//Sort the array
		var top25 = new Map();
		
		//Takes only the top 25 values foudn in the key-map
		var i = 0;
		
		console.log("Top 25 most common words found: ");
		
		//Output only the top 25 most common keywords found
		for(const [key, value] of key_map)
		{
			if(i == 25)
				break;
			
			console.log("#" + (i+1) + ": " + key + " has appeared " + value + " times.");
			top25.set(key, value);		//Copy the contents into the new array
			i += 1;
		}
		
		return top25;
		
			/*
			
			//var re = new RegExp("(\\b" + word + ")\\b", "gi");
			
			//If there was a match found in the page
			if(allText.match(re))
			{
				count = (allText.match(re || [])).length;
				var key_word = {count: count, word: word};
				//console.log(word + ": " +  count);	
				top25Keys.splice(top25Keys.length - 1, 0, key_word);
				allText = allText.replace(re, '');
				
				word = allText.split(' ')[1];
				console.log("ALLTEXT: " + allText);
				console.log("Alltext split: " + allText.split(' '));
				console.log("word: " + word);
				
			*/
				
				/* SCRAPPED.  OVERLY COMPLICATED AND COSTS TOO MUCH IN TERMS OF TIME COMPLEXITY.  DOESN'T WORK FOR THE LAST ELEMENT. */
				
				/*
				if(top25Keys.length < 25)
				{
					
					//Count all matches found and return that amount
					console.log(word + ": " +  count);	
					top25Keys.splice(top25Keys.length - 1, 0, key_word);
				}
				
				else
				{
				
				*/	
					
					/*
					 * Sorts the array in order to check for the smallest item in the set.
					 * THIS IS ACKNOWLEDGED TO BE INCREDIBLY INEFFICIENT BY O(N^2).
					 * THIS COULD BE MORE EFFICIENT BY CREATING A MINHEAP TO EXTRACT AND SORT IN O(N LOG N) time.
					 * HOWEVER, A MIN HEAP COULD NOT BE EFFECTIVELY CREATED AND DESIGNED WITHIN THE TIMEFRAME SPECIFIED BY THIS PROJECT
					 * THIS SOLUTION IS LESS EFFICIENT IN TERMS OF TIME COMPLEXITY BUT THIS CODE HAD TO BE DONE ON-TIME
					*/
					/*
					top25Keys = top25Keys.sort(sortByCount);
					
					//The array had to be split back into two variables to be recombined into one Object
					//Google Chrome would be unable to read the object and identify itself as closing the else bracket.
					//This is an issue with Chrome.
					var key_count = top25Keys[0].count;
					var word_count = top25Keys[0].word;
					var temp = {count: key_count, word: word_count};
	
					if(sortByCount(temp, key_word))
					{
						console.log(word + " has " + count + " compared to " + temp.word + " " + temp.count);
						top25Keys[0].count = key_word.count;
						top25Keys[0].word = key_word.word;
					}
					else
					{
						console.log(key_word.word + " has " + key_word.count + " compared to " + temp.word + " " + temp.count);
					}
					*/
			/*
			}
			else
			{
				console("Stop");
				return -1;
			}
			*/
	}
	
	
	/* Goes through the entire JSON file and searches for every match found, counts the # of occurrences, then replaces every word found
	   with the # of occurrences. */
	async function replaceText(input)
	{
		var WordList = await fetchJSON();
		var top25 = await countAll(input);
		
		/*
		* If the word has been found, replace the text with the # of occurrences
		* RegEX expression informs to search for all exact word matches of a word found in the JSON file, case-insensitive
		* ignoring any occurences found enclosed within an HTML format
		*/
		for(const[key, value] of top25)
		{			
			var re = new RegExp("(\\b" + key + ")(?!([^<]+)?>)\\b", "gi");	
			input = input.replaceAll(re, value);	//Updates the new text with the string with the replaced words
		}
		return input;
	}
	
	/* The main function used to execute the program */
	async function replaceCommonText(input)
	{
		var WordList = await fetchJSON();
		input = await replaceText(input);	//Read the string and replace the words with the # of occurrences
		
		console.log("EDITED OUTPUT: " + input);
	}
</script>