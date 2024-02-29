-- This is an empty migration.-- SQLite
CREATE TRIGGER delete_user_avatar DELETE ON profile
 BEGIN  
  DELETE FROM image WHERE url = old.avatar_url;
  END;
