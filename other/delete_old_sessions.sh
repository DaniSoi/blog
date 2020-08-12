#!/bin/bash

psql blog <<END
    delete from sessions 
    where createdAt < now() - interval '7 days';
END


