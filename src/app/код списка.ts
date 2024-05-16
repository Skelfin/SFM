// <div class="flex items-center ml-auto">
//     <div class="relative">
//         <button (click)="toggleDropdown(card.id - 1)" class="pt-1 pr-4">
//             <fa-icon [icon]="trackSelections[card.id - 1] ? faCircleCheck : faCirclePlus" class="fa-xl fa-regular"
//               [ngClass]="{'text-green-500': trackSelections[card.id - 1], 'text-gray-300': !trackSelections[card.id - 1]}"></fa-icon>
//           </button>
//         @if (openDropdownIndex === i) {
//         <div
//             class="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
//             <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//                 <div class="flex justify-between items-center px-4 py-2 text-sm text-gray-700">
//                     Любимые треки
//                     <button (click)="toggleIcon(card.id - 1)" class="focus:outline-none">
//                         <fa-icon [icon]="selectedIcon[card.id - 1] ? faCircleCheck : faCircle" class="fa-lg"
//                             [ngClass]="{'text-green-500': selectedIcon[card.id - 1], 'text-gray-300': !selectedIcon[card.id - 1]}"></fa-icon>
//                     </button>
//                 </div>
//                 <div class="flex justify-between items-center px-4 py-2 text-sm text-gray-700">
//                     Return
//                     <button (click)="toggleIcon(card.id - 1)" class="focus:outline-none">
//                         <fa-icon [icon]="selectedIcon[card.id - 1] ? faCircleCheck : faCircle" class="fa-lg"
//                             [ngClass]="{'text-green-500': selectedIcon[card.id - 1], 'text-gray-300': !selectedIcon[card.id - 1]}"></fa-icon>
//                     </button>
//                 </div>
//                 <div class="flex justify-end space-x-4 p-4">
//                     <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                         (click)="finalizeSelection()">Готово</button>
//                     <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                         (click)="closeDropdown()">Отмена</button>

//                 </div>
//             </div>
//         </div>
//         }
//     </div>

// </div>


// trackSelections: { [id: number]: boolean } = {};
// selectedIcon: { [key: number]: boolean } = {};
// openDropdownIndex: number | null = null;
// toggleDropdown(cardId: number): void {
//   this.openDropdownIndex = this.openDropdownIndex === cardId ? null : cardId;
// }
// toggleIcon(cardId: number): void {
//   this.selectedIcon[cardId] = !this.selectedIcon[cardId];
// }
// closeDropdown(): void {
//   this.openDropdownIndex = null;
// }

// finalizeSelection(): void {
//   let anySelected = false;

//   Object.keys(this.selectedIcon).forEach(key => {
//     const cardId = Number(key);
//     if (this.selectedIcon[cardId]) {
//       anySelected = true;
//       this.trackSelections[cardId] = true;
//     }
//   });

//   if (!anySelected) {
//     Object.keys(this.trackSelections).forEach(key => {
//       const cardId = Number(key);
//       this.trackSelections[cardId] = false;
//     });
//   }

//   this.closeDropdown();
// }