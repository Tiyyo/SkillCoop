// import { Trash2 } from 'lucide-react';
// import { useApp } from '../../store/app.store';
// import MenuItemDialog from '../../components/menu-item-dialog';
// import { useDeleteUser } from '../../hooks/useProfile';

// function DeleteUser() {
//   const { userProfile, setIsAuth } = useApp();
//   const { mutate: deleteUserAccount } = useDeleteUser({
//     onSuccess: () => {
//       setIsAuth(false);
//     },
//   });

//   return (
//     // <div
//     //   className="text-error flex gap-4 justify-center cursor-pointer
//     //   fixed bottom-0 w-full py-4 border-4"
//     // >
//     <div className="fixed bottom-0 w-full mb-4">
//       <MenuItemDialog
//         mutateFn={deleteUserAccount}
//         description="This action cannot be undone.
//         This will permanently delete your account."
//         mutationData={userProfile?.user_id}
//       >
//         <div
//           className="flex gap-2 text-error justify-center
//           items-center w-full"
//         >
//           <Trash2 />
//           <span className="">Delete your acccount</span>
//         </div>
//       </MenuItemDialog>
//     </div>
//   );
// }

// export default DeleteUser;
