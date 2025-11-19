import { MaybeBothTask } from '@both/constants/bs'
import { Message, Resolver } from '@both/states/messenger'

export function send<T>(this: MaybeBothTask, message: Message): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
        if (this === undefined) {
            reject('Hàm send phải được gọi thông qua task')
            return
        }
        if (!this.messenger.postMessage) {
            // TODO: Kiểm tra trường hợp task đã đóng nữa.
            reject(
                'Tạm thời báo lỗi nếu chưa có postMesage mà đã gửi dữ liệu. Sau này sẽ làm nếu gửi sẽ có một hàm trả về promise đợi cho đến khi task có postMessage rồi mới gửi.'
            )
            return
        }

        const resolver: Resolver = {
            messageId: message.messageId,
            resolve,
            reject
        }
        this.messenger.resolvers.push(resolver)
        this.messenger.postMessage(message, '*')
    })
}
