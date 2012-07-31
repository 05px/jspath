var jpath = require('../src/jspath'),
    testData = {
        name : 'books and authors',
        info : {
            description : 'books about javascript'
        },
        booksCount : 5,
        books : [
            {
                idx : 0,
                name : 'Clean Code',
                author : { name : 'Robert C. Martin' },
                price : 17.96,
                oldPrices : [10, 15]
            },
            {
                idx : 1,
                favorite : true,
                name : 'Maintainable JavaScript',
                author : { name : 'Nicholas C. Zakas' },
                price : 10,
                oldPrices : [20, 10, 5]
            },
            {
                idx : 2,
                name : 'Agile Software Development',
                favorite : false,
                author : { name : 'Robert C. Martin' },
                price : 20,
                oldPrices : []
            },
            {
                idx : 3,
                name : 'JavaScript: The Good Parts',
                author : { name : 'Douglas Crockford' },
                description : {
                    notes : 'must read'
                },
                price : 15.67,
                oldPrices : [12.23, 15]
            },
            {
                idx : 4,
                name : 'JavaScript: The Good Parts',
                author : { name : 'Douglas Crockford' },
                price : 25,
                oldPrices : [50, 30.33, 27]
            }
        ],
        authors : [
            { name : 'Nicholas C. Zakas' },
            { name : 'Douglas Crockford' },
            { name : 'Robert C. Martin' },
            { name : 'John Resig' }
        ]
    },
    tests = [
        { path : '@', res : [testData] },
        { path : '@', data : [{ test : 'test' }], res : [{ test : 'test' }]},
        { path : '@', data : 'test', res : ['test']},
        { path : '@', data : 5, res : [5]},
        { path : '@', data : true, res : [true]},
        { path : '@', data : null, res : [null]},
        { path : '@', data : undefined, res : [undefined]},
        { path : '@.name', res : ['books and authors']},
        { path : '@.noexists', res : []},
        { path : '@."test.test"', data : { 'test.test' : 'test' }, res : ['test']},
        { path : '@.authors.name', res : ['Nicholas C. Zakas', 'Douglas Crockford', 'Robert C. Martin', 'John Resig']},
        { path : '@.books.author.name', res : ['Robert C. Martin', 'Nicholas C. Zakas', 'Robert C. Martin', 'Douglas Crockford', 'Douglas Crockford']},
        { path : '@.info{@.description}', res : [{ description : 'books about javascript' }]},
        { path : '@.info{@.noexists}', res : []},
        { path : '@.books{@.favorite}.idx', res : [1, 2]},
        { path : '@.books{@.author.name}.idx', res : [0, 1, 2, 3, 4]},
        { path : '@.books{@.description.notes}.idx', res : [3]},
        { path : '@.books{@.author.noexists}.idx', res : []},
        { path : '@.books[0].idx', res : ['0']},
        { path : '@.books[2].idx', res : ['2']},
        { path : '@.books[6].idx', res : []},
        { path : '@.books[-1].idx', res : ['4']},
        { path : '@.books[2..].idx', res : ['2', '3', '4']},
        { path : '@.books[10..].idx', res : []},
        { path : '@.books[-2..].idx', res : ['3', '4']},
        { path : '@.books[1..3].idx', res : ['1', '2']},
        { path : '@.books[10..20].idx', res : []},
        { path : '@.books[2..-1].idx', res : ['2', '3']},
        { path : '@.books[-3..-1].idx', res : ['2', '3']},
        { path : '@.books[..2].idx', res : ['0', '1']},
        { path : '@.books[..-2].idx', res : ['0', '1', '2']},
        { path : '@.books[..0].idx', res : []},
        { path : '@.books{@.author.name == "Robert C. Martin"}.idx', res : [0, 2]},
        { path : '@.books{@.author.name == "John Resig"}', res : []},
        { path : '@.books{@.favorite === true}.idx', res : [1]},
        { path : '@.booksCount{@ > 4}', res : [5]},
        { path : '@.booksCount{@ > 10}', res : []},
        { path : '@.booksCount{@ >= 5}', res : [5]},
        { path : '@.booksCount{@ == 5}', res : [5]},
        { path : '@.booksCount{@ === "5"}', res : []},
        { path : '@.booksCount{@ === 5}', res : [5]},
        { path : '@.books{@.price > 16}.idx', res : [0, 2, 4]},
        { path : '@.books{@.price > 17.97}.idx', res : [2, 4]},
        { path : '@.books{@.price < 16}.idx', res : [1, 3]},
        { path : '@.books{@.price == 10}.idx', res : [1]},
        { path : '@.books{@.price <= 10}.idx', res : [1]},
        { path : '@.books{@.price >= 10}.idx', res : [0, 1, 2, 3, 4]},
        { path : '@.books{@.price > 10}{@.price < 20}.idx', res : [0, 3]},
        { path : '@.books[1..]{@.price > 10}{@.price < 20}.idx', res : [3]},
        { path : '@.books{@.price > 10}[0].idx', res : [0]},
        { path : '@.books{@.oldPrices > @.price}.idx', res : [1, 4]},
        { path : '@.books{@.oldPrices === @.price}.idx', res : [1]}
    ];

tests.forEach(function(testItem, i) {
    exports[i + 1 + '. ' + testItem.path] = function(test) {
        test.deepEqual(jpath.apply(testItem.path, 'data' in testItem? testItem.data : testData), testItem.res);
        test.done();
    };
});