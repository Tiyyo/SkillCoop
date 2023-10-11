import { useState } from 'react'

function AvatarEdit({ avatar }: { avatar: string | null }) {
  const [ profileAvatar , setProfileAvatar] = useState<string | null>(avatar
  const imageInputRef = useRef<HTMLInputElement>(null)                                                                  

  const handleChangeImage = (e : any) => {
    e.preventDefault();
    imageRef.current.click();
  };

  const { mutate , isSuccess } = useMutation((formData) => updateAvatarFn(formData))

  

    const handleChangeImageFile = async (e : any) => {
    const validFilesTypes = ["image/png", "image/jpg", "image/jpeg","image/svg", "image/webp"];
    const maxSize = 10 * 1024 * 1024 * 1024; // 1024 mo

    if (!validFilesTypes.find((type) => type === e.target.files[0].type)) {
      console.log("File must be an png or jpg type");
      return;
    } else if (e.target.files[0].size > maxSize) {
      console.log("File must not exceded 1024 mo");
      return;
    }
    else {  

    const formData = new FormData();
    formData.append('id', userId.toString());
    formData.append('image', e.target.files[0]);

    mutate(formData)

  }};
  
  return (
    <form encType="multipart/form-data" className="border flex-shrink-0 border-primary-500 overflow-hidden rounded-full h-20 w-20">
      <labe htmlFor="image>
        <img
        src={avatar ?? '/images/default-avatar.png'}
        alt="avatar"
        className="object-cover h-full w-full"
        />
        <input type="file" hidden ref={imageInputRef} id="image" name="image" onChange={handleChangeImageFile} />
      </label>
    </form>
  );
}

export default AvatarEdit;
