#!/bin/bash

psql blog <<END
    delete from verify_tokens 
    where createdAt < now() - interval '7 days';
END


