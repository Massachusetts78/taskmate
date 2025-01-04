export class NotificationService {
    static async requestPermission() {
        if (!('Notification' in window)) {
            console.error('This browser does not support notifications');
            return false;
        }

        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }

    static async showNotification(title, options = {}) {
        if (Notification.permission !== 'granted') {
            await this.requestPermission();
        }

        if (Notification.permission === 'granted') {
            return new Notification(title, {
                ...options,
            });
        }
    }
}
