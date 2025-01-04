import { NotificationService } from "./notification.js";

export class ReminderChecker {
    constructor() {
        this.checkInterval = 60000; // Check every minute
        this.timeoutIds = new Map();
    }

    scheduleReminder(task) {
        if (this.timeoutIds.has(task._id)) {
            clearTimeout(this.timeoutIds.get(task._id));
        }

        // Schedule due date reminder
        if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            const now = new Date();

            if (dueDate > now) {
                const timeoutId = setTimeout(() => {
                    NotificationService.showNotification('Task Due!', {
                        body: `Task "${task.taskName}" is due now!`,
                        tag: `due-${task._id}`,
                    });
                }, dueDate.getTime() - now.getTime());

                this.timeoutIds.set(`due-${task._id}`, timeoutId);
            }
        }

        // Schedule custom reminder
        if (task.reminder) {
            const reminderTime = new Date(task.reminder);
            const now = new Date();

            if (reminderTime > now) {
                const timeoutId = setTimeout(() => {
                    NotificationService.showNotification('Task Reminder', {
                        body: `Reminder for task "${task.taskName}"`,
                        tag: `reminder-${task._id}`,
                    });
                }, reminderTime.getTime() - now.getTime());

                this.timeoutIds.set(`reminder-${task._id}`, timeoutId);
            }
        }
    }

    clearReminder(taskId) {
        const dueTimeoutId = this.timeoutIds.get(`due-${taskId}`);
        const reminderTimeoutId = this.timeoutIds.get(`reminder-${taskId}`);

        if (dueTimeoutId) {
            clearTimeout(dueTimeoutId);
            this.timeoutIds.delete(`due-${taskId}`);
        }

        if (reminderTimeoutId) {
            clearTimeout(reminderTimeoutId);
            this.timeoutIds.delete(`reminder-${taskId}`);
        }
    }

    clearAllReminders() {
        this.timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
        this.timeoutIds.clear();
    }
}
