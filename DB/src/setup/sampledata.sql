INSERT INTO departments VALUES(1, 'Computer Science');

INSERT INTO employees VALUES
    (1, 'mark', 'fontenot', 1, 'prof', null, 'address', 'email1', 214, 5, 0, null, null, null, 'true'),
    (2, 'Marcus', 'Sykora', 1, 'Student', '1', 'address', 'email2', 214, 5, 0, null, null, null, 'true');

INSERT INTO reports VALUES
    (1, 1, 2, 'Test report text', '11/5/2019', 'open', null, 0),
    (2, 2, 1, 'Some more text report text', '11/11/2019', 'open', null, 2);

INSERT INTO perf_reviews (emp_id, review, score, creation_date, active) VALUES
    (2, 'this is a performance review', 3, "11/3/2019", 'true'),
    (2, 'this is also a performance review', 4, '10/3/2019', 'true'),
    (1, 'this is a performance review', 3, "11/3/2019", 'true');
