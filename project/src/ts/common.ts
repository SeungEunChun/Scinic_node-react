//api table interface
export interface Apiproduct {
    p_id: number
    img: string
    title: string
    descpro: string
    price: number
    quantity?: number
    Category_no: number
}
//myform interface
export interface Apiform {
    idx: number
    u_name: string
    u_phone: string
    u_email: string
    marketing: string
    todate: Date

}
//타입변수설정 //generic
export interface commontalbe<T extends string | number> {
    id: T
    hp: T
}