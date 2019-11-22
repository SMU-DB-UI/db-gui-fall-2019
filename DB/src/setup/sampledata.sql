INSERT INTO departments VALUES(1, 'Computer Science');

INSERT INTO employees VALUES
    (1, 'mark', 'fontenot', 1, 'prof', null, 'address', 'email1', 214, -1, 0, null, null, null, 'true'),
    (2, 'Marcus', 'Sykora', 1, 'Student', '1', 'address', 'email2', 214, -1, 0, null, null, null, 'true');

INSERT INTO reports VALUES
    (1, 1, 2, 'Test report text', '11/5/2019', 'open', null, 0),
    (2, 2, 1, 'Some more text report text', '11/11/2019', 'open', null, 2);

INSERT INTO perf_reviews VALUES
    (1,1,"Great worker", 5, '11/5/2019', 'true'),
    (2,1,"Not great", 3, '11/6/2019', 'true');
