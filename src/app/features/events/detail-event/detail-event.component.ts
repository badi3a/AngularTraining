import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../shared/data/events.service';
import { Eventy } from '../../../models/eventy';
import { Feedback } from '../../../models/feedback';
import { FeedbackService } from '../../../shared/data/feedback.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrl: './detail-event.component.css',
})
export class DetailEventComponent implements OnInit {
  currentEvent: Eventy;
  feedbacks: Feedback[] = [];
  userId = '1';

  editFeedbackId: string | null = null;
  editContent: string = '';
  editRate: number = 1;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private feedbackService: FeedbackService
  ) {}
  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.eventService
      .getEventById(id)
      .subscribe((data: Eventy) => (this.currentEvent = data));
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe((allFeedbacks) => {
      this.feedbacks = allFeedbacks.filter(
        (fb) => fb.event_id === this.currentEvent.id
      );
    });
  }

  deleteFeedback(id: string) {
    this.feedbackService.deleteFeedback(id).subscribe(() => {
      this.loadFeedbacks();
    });
  }

  startEdit(fb: Feedback) {
    this.editFeedbackId = fb.id;
    this.editContent = fb.content;
    this.editRate = fb.rate;
  }

  cancelEdit() {
    this.editFeedbackId = null;
    this.editContent = '';
    this.editRate = 1;
  }

  saveEdit(fb: Feedback) {
    const updated: Feedback = {
      ...fb,
      content: this.editContent,
      rate: this.editRate,
    };
    this.feedbackService.updateFeedback(fb.id, updated).subscribe(() => {
      this.loadFeedbacks();
      this.cancelEdit();
    });
  }
}
