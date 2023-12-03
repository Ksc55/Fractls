import {
  OwnershipTransferRequested as OwnershipTransferRequestedEvent,
  // OwnershipTransferred as OwnershipTransferredEvent,
  // VRFOwnershipTransferred as OwnershipTransferred,
  RequestFulfilled as RequestFulfilledEvent,
  RequestSent as RequestSentEvent,
  OwnershipTransferred 
} from "../generated/VRF/VRF"
import {
  OwnershipTransferRequested,
  // OwnershipTransferred,
  VRFOwnershipTransferred as OwnershipTransferredEntity,
  RequestFulfilled,
  RequestSent
} from "../generated/schema"

export function handleOwnershipTransferRequested(
  event: OwnershipTransferRequestedEvent
): void {
  let entity = new OwnershipTransferRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

// export function handleOwnershipTransferred(
//   event: OwnershipTransferredEvent
// ): void {
//   let entity = new OwnershipTransferred(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.from = event.params.from
//   entity.to = event.params.to

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let entity = new OwnershipTransferredEntity(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.from = event.params.from
  entity.to = event.params.to
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
 }

export function handleRequestFulfilled(event: RequestFulfilledEvent): void {
  let entity = new RequestFulfilled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.randomWords = event.params.randomWords

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRequestSent(event: RequestSentEvent): void {
  let entity = new RequestSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.numWords = event.params.numWords

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
