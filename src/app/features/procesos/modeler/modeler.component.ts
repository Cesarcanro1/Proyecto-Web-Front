import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-modeler',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './modeler.html',
  styleUrls: ['./modeler.scss']
})
export class ModelerComponent {

  nodes: any[] = [
    // ejemplo inicial (puedes borrar)
    { id: 1, x: 200, y: 200, label: 'Inicio', type: 'start' },
  ];

  connections: any[] = [];

  selectedNode: any = null;

  addNode(type: string) {
    const id = this.nodes.length + 1;

    const newNode = {
      id,
      x: 400,
      y: 300,
      label: type === 'activity' ? 'Actividad' :
             type === 'gateway' ? 'Gateway' :
             type === 'end' ? 'Fin' : 'Nuevo',
      type
    };

    this.nodes.push(newNode);
  }

  onDrag(event: any, node: any) {
    node.x = event.source.getFreeDragPosition().x;
    node.y = event.source.getFreeDragPosition().y;
  }

  connect(a: any, b: any) {
    this.connections.push({ from: a.id, to: b.id });
  }

}
