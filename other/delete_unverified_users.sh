#!/bin/bash

psql blog <<END
    delete from users
    where isVerified = false AND createdAt < now() - interval '7 days';
END

