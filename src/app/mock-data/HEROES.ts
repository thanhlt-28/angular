import {Hero} from '../models/hero';
export const HEROES: Array<Hero> = [
    {
        id: 1,
        name: "<a href='javascript:;'>Lương Quốc Vương</a>",
        image: "https://iap.poly.edu.vn/user/ph/PH12301.jpg",
        skills: [
            {
                id: 1,
                name: "PHP"
            },
            {
                id: 2,
                name: "javascript"
            },
            {
                id: 3,
                name: "HTML"
            }
        ]
    },
    {
        id: 2,
        name: "Tạ Trần An",
        image: "https://iap.poly.edu.vn/user/ph/PH12538.jpg",
        skills: [
            {
                id: 1,
                name: "PHP"
            }
        ]
    },
    {
        id: 3,
        name: "Nguyễn Hùng Cường",
        image: "https://iap.poly.edu.vn/user/ph/PH09018.jpg"
    },
    {
        id: 4,
        name: "Chu Thị Hoa",
        image: "https://iap.poly.edu.vn/user/ph/PH09598.jpg"
    }
]