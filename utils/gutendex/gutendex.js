// // call the gutendex api
// // get all the books and translate to my schema and seed my database
const sypnosisList = require("./sypnopsis")
const randomInteger =  (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
const axios = require("axios");


//get back data from http://gutendex.com//books/37106
const getBooksMethods = { 
    getBooks: async() => {
        const seedingList = []
        const res = await axios.get(`http://gutendex.com/books?mime_type=application%2Fepub%2Bzip`)
        const data = res.data.results
        // console.log(data)
        // console.log("data length", data.length)
        data.forEach(bookData => {
            console.log(bookData)
            const {title, authors, subjects, formats, download_count} = bookData
            const authorName = authors[0]?.name || "Unknown author"
            const newBookData = {
                title:title,
                author: authorName,
                genreId: randomInteger(0,15),
                sypnosis: sypnosisList[randomInteger(0,sypnosisList.length-1)],
                copiesAvailable : randomInteger(2,5),
                epubUrl: formats["application/epub+zip"],
                totalLoans: download_count,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                bookImgUrl: formats["image/jpeg"]
            }
            seedingList.push(newBookData)
        });
        // console.log(seedingList.length)
        //console.log(seedingList)
        return seedingList
    }
}
getBooksMethods.getBooks()

module.export = getBooksMethods

// {
//     "id": 37106,
//     "title": "Little Women; Or, Meg, Jo, Beth, and Amy",
//     "authors": [
//       {
//         "name": "Alcott, Louisa May",
//         "birth_year": 1832,
//         "death_year": 1888
//       }
//     ],
//     "translators": [],
//     "subjects": [
//       "Autobiographical fiction",
//       "Bildungsromans",
//       "Domestic fiction",
//       "Family life -- New England -- Fiction",
//       "March family (Fictitious characters) -- Fiction",
//       "Mothers and daughters -- Fiction",
//       "New England -- Fiction",
//       "Sisters -- Fiction",
//       "Young women -- Fiction"
//     ],
//     "bookshelves": [],
//     "languages": [
//       "en"
//     ],
//     "copyright": false,
//     "media_type": "Text",
//     "formats": {
//       "text/html; charset=iso-8859-1": "https://www.gutenberg.org/files/37106/37106-h/37106-h.htm",
//       "text/plain; charset=us-ascii": "https://www.gutenberg.org/files/37106/37106.txt",
//       "image/jpeg": "https://www.gutenberg.org/cache/epub/37106/pg37106.cover.medium.jpg",
//       "text/plain": "https://www.gutenberg.org/ebooks/37106.txt.utf-8",
//       "application/rdf+xml": "https://www.gutenberg.org/ebooks/37106.rdf",
//       "application/epub+zip": "https://www.gutenberg.org/ebooks/37106.epub3.images",
//       "application/x-mobipocket-ebook": "https://www.gutenberg.org/ebooks/37106.kf8.images",
//       "text/html": "https://www.gutenberg.org/ebooks/37106.html.images"
//     },
//     "download_count": 109619
//   }