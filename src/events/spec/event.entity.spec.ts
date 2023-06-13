import { Event } from "../entity/event.entity"

test('Event should be initialized through constructor', () => {
    const event = new Event({
        name: 'Test name',
        description: 'Test desc'
    });

    expect(event).toEqual({
        name: 'Test name',
        description: 'Test desc',
        id: undefined,
        when: undefined,
        address: undefined,
        attendees: undefined,
        organizer: undefined,
        organizerId: undefined,
        event: undefined,
        attendeeCount: undefined,
        attendeeRejected: undefined,
        attendeeMaybe: undefined,
        attendeeAccepted: undefined,
    })
})